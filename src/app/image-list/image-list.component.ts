import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ImageServiceClient} from '../services/image.service.client';
import {ActivatedRoute} from '@angular/router';
import {CommentServiceClient} from '../services/comment.service.client';
// import Global = NodeJS.Global;
declare var $;
let self;
@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  @ViewChild('addcommentmodal') addcommentmodal: ElementRef;


  constructor(private service: ImageServiceClient,
              private commentService: CommentServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
    self = this;
    // const global.__basedir = __dirname;
  }

  //
  images = [];
  projectId;
  authBtn;
  comments = [];
  comment;
  clickUpload = false;
  srcPath;

  developerKey = 'AIzaSyBp_GUisXiOtYTYr5Z4ioHu54G87fkMK4s';
  clientId = '980576583017-vh5hhfqognajhlikef4jkmqs38leau6c.apps.googleusercontent.com';
  scope = 'https://www.googleapis.com/auth/drive';
  pickerApiLoaded = false;
  oauthToken;
  picker;
  message;
  doc;
  url;
  fileId;
  request;

  myToken;
  myXHR = new XMLHttpRequest();
  responseText;
  responseResult = [];

  onApiLoad() {
    gapi.load('client:auth2', this.onAuthApiLoad);
    // gapi.client.load('drive', this.downloadFile);
    gapi.load('picker', this.onPickerApiLoad);
    // gapi.load('client', this.downloadFile);
  }

  onAuthApiLoad() {
    // this.authBtn = document.getElementById('auth');
    // this.authBtn.disabled = false;
    // this.authBtn.addEventListener('click', function() {
    gapi.auth2.authorize({
      client_id: self.clientId,
      scope: self.scope
    }, self.handleAuthResult);
    // });
  }
  onPickerApiLoad() {
    self.pickerApiLoaded = true;
    self.createPicker();
  }

  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      self.oauthToken = authResult.access_token;
      self.createPicker();
    }
  }

  createPicker() {
    if (this.pickerApiLoaded && this.oauthToken) {
      this.picker = new google.picker.PickerBuilder().
      addView(google.picker.ViewId.DOCS).
      setOAuthToken(this.oauthToken).
      setDeveloperKey(this.developerKey).
      setCallback(this.pickerCallback).
      build();
      this.picker.setVisible(true);
    }
  }

  pickerCallback(data) {
    this.url = 'nothing';
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
      this.doc = data[google.picker.Response.DOCUMENTS][0];
      this.url = this.doc[google.picker.Document.URL];
      this.fileId = this.doc.id;
      // console.log('here');
      //
      // // gapi.client.load('auth');
      //


      // this.request = gapi.client.request({
      //   method: 'GET',
      //   fileId: this.fileId,
      //   alt: 'media',
      //   path: '/drive/v3/files',
      // });
      // .pipe('/images/this.fileId');

      // gapi.client.load('drive', 'v2', this.downloadFile);



      this.myToken = gapi.auth.getToken().access_token;
      // console.log(this.fileId);
      // console.log(this.myToken);


      const docId = this.doc.id;
      fetch('https://www.googleapis.com/drive/v3/files/' + this.fileId + '?alt=media', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + this.myToken, 'Content-Type': 'application/json; charset=utf-8'}
      }).then(res => {
        // console.log(res);
        return res.blob();
      })
        .then(res => {
          fetch('https://www.googleapis.com/drive/v3/files/' + this.fileId, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + this.myToken, 'Content-Type': 'application/json; charset=utf-8'}
          }).then(reslist => reslist.json())
            .then(fileJson => {
              console.log(fileJson);
              let contents;
              contents = {
                'name': fileJson.name,
                'mimeType': fileJson.mimeType
                // 'contents': res
              };
              self.service.saveImageAndAddRecord(self.projectId, contents)
                .then(saveRes => {
                  // let file, a, url;
                  // file = new File([res], 'filebro.png');
                  // a = document.createElement('a');
                  // url = URL.createObjectURL(file);
                  // a.href = url;
                  // a.download = './images/filebro.png';
                  // document.body.appendChild(a);

                  // file.save();
                  self.service.upsdateImageRecordWithBlob(saveRes.id, res, fileJson.mimeType);
                })
                .then(() => self.loadImages(self.projectId));
              });
            });
          // const objUrl = window.URL.createObjectURL(res);
          // console.log(res);
          // this.request.execute(function (response) {
          //   // console.log(docId);
          //   self.responseResult = response.files.filter(responseElem => responseElem.id === docId);
          //   // console.log(self.responseResult);
          //   let contents;
          //   contents = {
          //     'name': self.responseResult[0].name,
          //     'mimeType': self.responseResult[0].mimeType
          //     // 'contents': res
          //   };
          //   // console.log(contents);
          //   self.service.saveImageAndAddRecord(self.projectId, contents)
          //     .then(saveRes => self.service.updateImageRecordWithBlob(saveRes.id, res, self.responseResult[0].mimeType))
          //     .then(self.loadImages(self.projectId));
          // });
        // });



      // self.myXHR.open('GET', 'https://www.googleapis.com/drive/v3/files/' + this.fileId + '?alt=media', true)
      // self.myXHR.setRequestHeader('Authorization', 'Bearer ' + this.myToken);
      // // self.myXHR.responseType = 'arraybuffer';
      // self.myXHR.onload = ev => {
      //   console.log(typeof  self.myXHR.response);
      //   let name, blob, url, a, arraybuffer;
      //
      //   arraybuffer = self.myXHR.response;
      //   name = 'image.jpg';
      //
      //   // let _location, applicationNameIndex, applicationName, webFolderIndeX, webFolderFullPath;
      //   // _location = document.location.toString();
      //   // applicationNameIndex = _location.indexOf('/', _location.indexOf('://') + 3);
      //   // applicationName = _location.substring(0, applicationNameIndex) + '/';
      //   // webFolderIndeX = _location.indexOf('/', _location.indexOf(applicationName) + applicationName.length);
      //   // webFolderFullPath = _location.substring(0, webFolderIndeX);
      //   // console.log(webFolderFullPath);
      //   let docId;
      //   docId = this.doc.id;
      //   console.log(arraybuffer);
      //   this.request.execute(function (response) {
      //     // console.log(response.files);
      //     self.responseResult = response.files.filter(responseElem => responseElem.id === docId);
      //     // console.log(self.responseResult);
      //     // if (self.responseResult[0].downloadUrl) {
      //     //     self.myToken = gapi.auth.getToken().access_token;
      //     //     self.myXHR.open('GET', self.responseResult[0].downloadUrl);
      //     //     // self.myXHR.setRequestHeader('Access-Control-Allow-Origin', '*');
      //     //     // self.myXHR.setRequestHeader('Access-Control-Allow-Headers', '*');
      //     //     self.myXHR.setRequestHeader('Content-Type', 'application/json');
      //     //     self.myXHR.setRequestHeader('Authorization', 'Bearer' + self.myToken);
      //     //     // self.myXHR.withCredentials = true;
      //     //     self.myXHR.onload = function() {
      //     //       self.responseText = self.myXHR.responseText;
      //     //     };
      //     //     console.log(self.myXHR);
      //     //     self.myXHR.send();
      //     //     console.log('here');
      //     //   }
      //
      //     let content;
      //     content = {
      //       'response': arraybuffer,
      //       'mimeType': self.responseResult[0].mimeType,
      //       'name': self.responseResult[0].name,
      //       'fileId': self.responseResult[0].id
      //     };
      //     console.log(content);
      //     self.service.saveImageAndAddRecord(self.projectId, content)
      //       .then(res => console.log(res));
      //   });
      //
      //
      //   console.log(self.responseResult);
      //
      //   blob = new Blob([arraybuffer], {type: 'image/jpeg'});
      //
      //   url = window.URL.createObjectURL(blob);
      //   console.log(url);
      //
      //   a = document.createElement('a');
      //   a.style = 'display:none';
      //   a.href = url;
      //   a.download = name;
      //   // a.click();
      //   window.URL.revokeObjectURL(url);
      //
      //
      // };
      // self.myXHR.send('');


      // this.request = gapi.client.drive.files.get({
      //   'fileId': this.fileId,
      //   'alt': 'media'
      // });

      // console.log(this.request);
      // gapi.load('drive', 'v3', function() {
      //   console.log('here');
      //
      //
      // })



      // gapi.load('client', this.downloadFile);


    }
    // this.message = 'You picked: ' + this.url;
    // document.getElementById('result').innerHTML = this.message;
  }

  filterResponse(responseElem) {
    return responseElem.id === self.docId;
  }

  // downloadFile() {
  //   console.log('here');
  //   // this.request = gapi.client.drive.files.get({
  //   //   'fileId': this.fileId,
  //   //   'alt': 'media'
  //   // });
  //
  //   drive.files.get({
  //     'fileId': this.fileId,
  //     'alt': 'media'
  //   }).pipe('/images/' + this.fileId);
  //
  // }






  setParams(params) {
    this.projectId = params['id'];
    this.loadImages(this.projectId);
  }

  ngOnInit() {
  }

  loadImages(projectId) {
    return this.service.findAllImages(projectId)
      .then(images => {

        // let i, urlCreator, binaryData;
        // urlCreator = window.URL;
        // for (i = 0; i < images.length; i++) {
        //   images[i].src = '';
        //   if (images[i].contents !== null) {
        //     console.log({'content': images[i].contents});
        //     // binaryData = [];
        //     // binaryData.push(images[i].contents);
        //     binaryData = new File([images[i].contents], 'filename', {type: 'Content-Type: ' + images[i].mimeType});
        //     images[i].src = urlCreator.createObjectURL(binaryData);
        //   }
        // }
        // console.log(images);
        this.images = images;
      });

  }

  toggleClickUpload() {
    this.clickUpload = !this.clickUpload;
  }

  addComment(image, comment) {
    // console.log(comment);
    // console.log(image);
    // const reviewIndex = document.getElementById('review').selectedIndex;
    // const commentObj = {
    //   comment: comment,
    //   review: document.getElementsByTagName('option')[reviewIndex].value
    // };
    //
    // this.commentService.saveCommentForImage(image.id, commentObj)
    //   .then(() => {
    //     alert('done bro');
    //   })
    // // alert(document.getElementsByTagName('option')[reviewIndex].value);
  }

  img;

  uploadFile(event) {
    console.log(document.querySelector('.upload-img'));
    console.log(event.target.files);
    let file;
    file = event.target.files[0];
    let contents;
    contents = {
      name: file.name,
      mimeType: file.type
    };

    self.img = new FileReader();
    self.img.readAsDataURL(event.target.files[0]);

    // console.log(self.img.blob());

    this.service.saveImageAndAddRecord(this.projectId, contents)
      .then(function (response) {
        self.img = new FileReader();
        self.img.readAsDataURL(event.target.files[0]);
        // let file1, a, url;
        // file1 = new File([event.target.files[0]], 'filebro.png');
        // a = document.createElement('a');
        // url = URL.createObjectURL(file1);
        // a.href = url;
        // a.download = './images/filebro.png';
        // document.body.appendChild(a);
        // a.click();
        return self.service.updateImageRecordWithBlob(response.id, event.target.files[0], file.type);
      })
      .then(() => this.loadImages(this.projectId));
  }

}
