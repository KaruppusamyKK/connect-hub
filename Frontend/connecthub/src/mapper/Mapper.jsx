
export const mapProfileToBackendPayload = (changedFields) => {
    const backendPayload = {};

    Object.entries(changedFields).forEach(([key, { newValue }]) => {

        switch (key) {
            case "about":
                backendPayload.summary = newValue;
                break;

            default:
                backendPayload[key] = newValue;
        }
    });

    return mapProfileToBackendPayload;
};


export const mapEducationToBackendPayload = (changedFields, educationID) => {
  const fieldMap = Object.values(changedFields)[0]; 

  const edu = {
    id: educationID,
  };

  Object.entries(fieldMap).forEach(([field, { newValue }]) => {
    if (["startDate", "endDate"].includes(field) && newValue) {
      edu[field] = new Date(newValue).toISOString().split("T")[0];
    } else {
      edu[field] = newValue;
    }
  });

  return edu;
};

