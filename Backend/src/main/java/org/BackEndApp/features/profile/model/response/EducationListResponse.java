package org.BackEndApp.features.profile.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EducationListResponse {

    private String degree;
    private String collegeName;
    private String startDate;
    private String endDate;
    private String grade;
    private String description;
}
