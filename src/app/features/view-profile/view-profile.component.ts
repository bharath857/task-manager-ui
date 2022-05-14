import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBarType, SnakbarService } from 'src/app/shared/services/snackbar/snakbar.service';
import { ProfileService, userProfile } from 'src/app/shared/services/tasks-api/profile/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userImage: any = '../../../assets/no-profile-pic-icon-7.jpg';
  editProfile: boolean = false;
  userProfile: FormGroup
  userId: string = '';
  createdon: string = '';
  userImageFound: boolean = false;
  
  subscriptions: Subscription[] = [];

  constructor(private profile: ProfileService,
    private snakbar: SnakbarService,) {
    this.userProfile = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    this.subscriptions.push(this.profile.getUserInfo().subscribe((response: any) => {
      if (response.success) {
        this.userProfile = new FormGroup({
          name: new FormControl(response.user.name, [Validators.required]),
          age: new FormControl(response.user.age, [Validators.required]),
          email: new FormControl(response.user.email, [Validators.required]),
        })
        this.createdon = response.user.createdAt
        this.userId = response.user._id
        this.getProfilePic(response.user._id)
        this.snakbar.showSnakBar('User Info', MatSnackBarType.info)
      } else {
        this.snakbar.showSnakBar('error getting user Info', MatSnackBarType.error)
      }
    }))
  }

  getProfilePic(id: string) {
    this.subscriptions.push(this.profile.getuserImage(id).subscribe((response: Blob) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.userImage = reader.result;
      }, false);
      if (response) {
        reader.readAsDataURL(response);
        this.userImageFound = true;
      }
    }))
  }

  editOrUpdateProfile(value: string) {
    if (value === 'edit') {
      if (this.editProfile) {
        this.updateProfile()
      } else {
        this.editProfile = true
      }
    } else {
      this.editProfile = false
    }
  }

  updateProfile() {
    this.editProfile = false
    let property: userProfile = {
      name: this.userProfile.get('name')?.value,
      age: this.userProfile.get('age')?.value,
      email: this.userProfile.get('email')?.value
    }
    this.subscriptions.push(this.profile.updateUserProfile(property).subscribe((response: any) => {
      if (response.success) {
        this.userProfile = new FormGroup({
          name: new FormControl(response.user.name, [Validators.required]),
          age: new FormControl(response.user.age, [Validators.required]),
          email: new FormControl(response.user.email, [Validators.required]),
        })
        this.snakbar.showSnakBar('User Info updated', MatSnackBarType.success)
      } else {
        this.snakbar.showSnakBar('error updating user info', MatSnackBarType.error)
      }
    }))
  }

  removeProfilePic() {
    this.subscriptions.push(this.profile.deleteMyProfile().subscribe((response: any) => {
      if (response.success) {
        this.userImageFound = false
        this.userImage = '../../../assets/no-profile-pic-icon-7.jpg';
        this.snakbar.showSnakBar('Image removed', MatSnackBarType.success)
      } else {
        this.snakbar.showSnakBar('error unable to remove image', MatSnackBarType.error)
      }
    }))
  }

  uploadnewImage(event: any) {
    let selectedFile: File;
    selectedFile = <File>event.target.files[0];

    if (event.target.files) {
      this.subscriptions.push(this.profile.updateUserProfileImage(selectedFile).subscribe((response: any) => {
        if (response.success) {
          this.userImageFound = true;
          this.getProfilePic(this.userId)
          this.snakbar.showSnakBar('Image updated', MatSnackBarType.success)
        } else {
          this.snakbar.showSnakBar(response.error, MatSnackBarType.error)
        }
      }))
    }

  }

  logoutallDevices() {

  }
}
