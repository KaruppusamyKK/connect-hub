package org.BackEndApp.features.profile.controller;

import jakarta.mail.Multipart;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.features.Auth.utilities.SecurityUtil;
import org.BackEndApp.features.profile.model.ProfileDataRequest;
import org.BackEndApp.features.profile.model.response.ServerResponse;
import org.BackEndApp.features.profile.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;



    @GetMapping("/getProfileDetails")
    public ResponseEntity<ServerResponse> getProfileDetails(){
        log.info("Getting profile details of {} ", SecurityUtil.LOGGED_USER());
        ServerResponse response = profileService.getProfileDetails(SecurityUtil.LOGGED_USER());
        return ResponseEntity.ok(response);
    }


    @PostMapping("/saveProfileDetails")
    public ResponseEntity<ServerResponse> saveProfile(@RequestBody ProfileDataRequest.BasicProfile profileRequest) throws IllegalAccessException {
        log.info("Request to save profile record {} ",profileRequest);
        ServerResponse serverResponse = profileService.saveProfileDetails(profileRequest);
        return ResponseEntity.ok().body(serverResponse);
    }


    @PostMapping("/updateEducationDetails")
    public ResponseEntity<ServerResponse> updateEducationDetails(@RequestBody ProfileDataRequest.Education educationRequest) {
        log.info("Request to save education records {} ",educationRequest);
        ServerResponse serverResponse = profileService.updateEducationDetails(educationRequest);
        return ResponseEntity.ok().body(serverResponse);
    }

    @PostMapping("/insertEducationDetails")
    public ResponseEntity<ServerResponse> insertEducationDetails(@RequestBody ProfileDataRequest.Education educationRequest) throws IllegalAccessException {
        log.info("Request to insert education record {} ",educationRequest);
        ServerResponse serverResponse = profileService.insertEducationDetails(educationRequest);
        return ResponseEntity.ok().body(serverResponse);
    }

    @PostMapping("/deleteEducationDetails/{id}")
    public ResponseEntity<ServerResponse> deleteEducationDetails(@PathVariable Long id){
        log.info("Request to delete education record {} ",id);
        ServerResponse serverResponse = profileService.deleteEducationDetails(id);
        return ResponseEntity.ok().body(serverResponse);
    }

    @PostMapping("/saveExperienceDetails")
    public ResponseEntity<ServerResponse> saveExperienceDetails(@RequestBody ProfileDataRequest.Experience experienceRequest){
        log.info("Request to save profile record {} ",experienceRequest);
        ServerResponse serverResponse = profileService.saveExperienceDetails(experienceRequest);
        return ResponseEntity.ok().body(serverResponse);
    }




    @PostMapping("/uploadProfile")
    public ResponseEntity<ServerResponse> uploadProfile(@RequestParam MultipartFile multipart){
        log.info("User uploading profile image {} ", SecurityUtil.LOGGED_USER());
        return ResponseEntity.ok(profileService.uploadProfile(SecurityUtil.LOGGED_USER(),multipart));
    }

//    @GetMapping("/getProfileImage")
//    public ResponseEntity<ServerResponse> getProfileImage(){
//        log.info("profile image fetched for user {} ", SecurityUtil.LOGGED_USER());
//        return ResponseEntity.ok(profileService.getProfileImage(SecurityUtil.LOGGED_USER()));
//    }

    @PostMapping("/deleteProfileImage")
    public ResponseEntity<ServerResponse> deleteProfileImage(){
        log.info("profile image fetched for user {} ", SecurityUtil.LOGGED_USER());
        return ResponseEntity.ok(profileService.deleteProfileImage(SecurityUtil.LOGGED_USER()));
    }






}