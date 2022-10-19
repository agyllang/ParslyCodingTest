const  eventPropertyInfo = (property) => {
    var propertyObj = { info: "", unit: "" };
    if (property === "Daily min temperature") {
      propertyObj.info =
        "Too low temperatures may impede the parsley plant to cultivate";
      propertyObj.unit = " °C";
    }
    if (property === "Daily max temperature") {
      propertyObj.info =
        "Too high temperatures dries out the soil quickly, make sure to water the plant";
      propertyObj.unit = " °C";
    }
    if (property === "Temperature") {
      propertyObj.info =
        "Temperatures below/above the limits may impede the parsley plant to cultivate";
      propertyObj.unit = "°C";
    }
  
    if (property === "Humidity") {
      propertyObj.info =
        "Humidity below/above the limits may damage the parsley plant";
      propertyObj.unit = "%";
    }
  
    if (property === "Wind speed") {
      propertyObj.info = "Wind speed levels above the limits can break the plant";
      propertyObj.unit = "m/s";
    }
    return propertyObj;
  };
  const timestampConvert = (UNIX_timestamp) => {
    var dateformat8601 = new Date(UNIX_timestamp).toISOString().slice(0, 10);
  
    return dateformat8601;
  };
  const timestampConvertFull = (UNIX_timestamp) => {
    var miliseconds = UNIX_timestamp*1000
    var date = new Date(miliseconds)
    var toIso= date.toISOString()
    return toIso
  };

  export  {eventPropertyInfo,timestampConvert,timestampConvertFull }