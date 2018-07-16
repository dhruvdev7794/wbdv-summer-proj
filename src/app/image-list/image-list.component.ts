import { Component, OnInit } from '@angular/core';
import {ImageServiceClient} from '../services/image.service.client';
import {ActivatedRoute} from '@angular/router';
let self;
@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  constructor(private service: ImageServiceClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
    self = this;
  }

  images = [];
  projectId;
  authBtn;

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
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      this.doc = data[google.picker.Response.DOCUMENTS][0];
      this.url = this.doc[google.picker.Document.URL];
      this.fileId = this.doc.id;
      // console.log('here');
      //
      // // gapi.client.load('auth');
      //


      this.request = gapi.client.request({
        'method': 'GET',
        'fileId': this.fileId,
        'alt': 'media',
        'path': '/drive/v2/files',
        'params': {'maxResults': '1'},
        // 'callback': function( theResponseJS, theResponseTxt) {
        //   // this.myToken = gapi.auth.getToken();
        //   // this.myXHR = new XMLHttpRequest();
        //   this.myXHR.open('GET', theResponseJS.downloadUrl, true);
        //   this.myXHR.setRequestHeader('Authorization', 'Bearer' + this.oauthToken);
        //   this.myXHR.onreadystatechange = function (theProgrssEvent) {
        //     this.myXHR.send();
        //   };
        //
        // }
      });
        // .pipe('/images/this.fileId');

      // gapi.client.load('drive', 'v2', this.downloadFile);


      this.request.execute(function (response) {
        console.log(response);
          if (response.items[0].webContentLink) {
            self.myToken = gapi.auth.getToken().access_token;
            self.myXHR.open('GET', response.items[0].webContentLink);
            // self.myXHR.setRequestHeader('Access-Control-Allow-Origin', '*');
            self.myXHR.setRequestHeader('Authorization', 'Bearer' + self.myToken);
            // self.myXHR.setHe
            self.myXHR.withCredentials = false;
            self.myXHR.onload = function() {
              self.responseText = self.myXHR.responseText;
            };
            self.myXHR.send();
          }
      });
      console.log('here');


      // self.myXHR.open('GET', 'https://www.googleapis.com/drive/v3/files/' + this.fileId + '?alt=media', true)
      // self.myXHR.setRequestHeader('Authorization', 'Bearer' + self.myToken);
      // self.myXHR.responseType = 'arraybuffer';
      // self.myXHR.onload = function() {
      //
      // }
      // self.myXHR.send();


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

      console.log(this.doc);
      console.log(this.doc.id);
    }
    // this.message = 'You picked: ' + this.url;
    // document.getElementById('result').innerHTML = this.message;
  }

  downloadFile() {
    console.log('here');
    // this.request = gapi.client.drive.files.get({
    //   'fileId': this.fileId,
    //   'alt': 'media'
    // });

    drive.files.get({
      'fileId': this.fileId,
      'alt': 'media'
    }).pipe('/images/' + this.fileId);

    // console.log(tihs.request);
  }






  setParams(params) {
    this.projectId = params['id'];
    this.loadImages(this.projectId);
  }

  ngOnInit() {
  }

  loadImages(projectId) {
    return this.service.findAllImages(projectId)
      .then(images => this.images = images);

  }

}
