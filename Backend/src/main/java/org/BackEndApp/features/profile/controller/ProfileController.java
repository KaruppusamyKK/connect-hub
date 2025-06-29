package org.BackEndApp.features.profile.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.features.Auth.utilities.SecurityUtil;
import org.BackEndApp.features.profile.model.ProfileDataRequest;
import org.BackEndApp.features.profile.model.response.ProfileResponse;
import org.BackEndApp.features.profile.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;


    @PostMapping("/saveProfile")
    public ResponseEntity<ProfileResponse> saveProfile(@RequestBody ProfileDataRequest profileRequest){
        log.info("Request to save profile record {} ",profileRequest);
        ProfileResponse profileResponse = profileService.saveProfileDetails(profileRequest);
        return ResponseEntity.ok().body(profileResponse);
    }

    @GetMapping("/getProfileDetails")
    public ResponseEntity<ProfileResponse> getProfileDetails(){
        log.info("Getting profile details of {} ", SecurityUtil.LOGGED_USER());
        ProfileResponse response = profileService.getProfileDetails(SecurityUtil.LOGGED_USER());
        return ResponseEntity.ok(response);
    }






}