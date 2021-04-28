import { getTargetUrl } from '../Helpers'

const gulliesActivePopup = feature => {
  //const varName = getTargetUrl()

  return `<div class="item"><i class="tag fa fa-map-marker"></i><p class="title">Location </p><p class="info">${feature.properties.street}</p></div><hr/>
  <input id="siteCode" name="siteCode" type="hidden" value="${feature.properties.site_code}">
  <input id="assetId" name="assetId" type="hidden" value="${feature.properties.central_asset_id}">
  <input id="easting" name="easting" type="hidden" value="${feature.properties.easting}">
  <input id="northing" name="northing" type="hidden" value="${feature.properties.northing}">
  <button class="govuk-button govuk-!-margin-bottom-0 govuk-!-margin-top-4" data-module="govuk-button">
    Report this gully
  </button>`
}

const gulliesFaultPopup = feature => {
 const varName = getTargetUrl()

 return `<div class="item"><i class="tag fa fa-map-marker"></i><p class="title">Location </p><p class="info">${feature.properties.street}</p></div>
    <div class= "message-fault">A blocked drain has already been reported</div><hr>
    <a class="button-primary" href="${varName}/track-a-report/details/${feature.properties.ext_system_ref}">View this report</a>
    <a class="button-primary" href="https://www.stockport.gov.uk/">Go to the homepage</a>`

}

const gulliesMaintenancePopup = feature => {
 const message =
   feature.properties.message ??
   'This gully is part of a maintenance programme and will be fixed without a need to report'

 return`<div class="item"><span class="iconify" data-icon="fa-map-marker" data-inline="false"></span></i><p class="title">Location </p><p class="info">${feature.properties.street}</p></div><hr>
    <div class="item"><i class="tag fa fa-tag"></i><p class="title">Number on grid </p><p class="info">${feature.properties.central_asset_id}</p></div>
    <div class= "message-maintenance">${message}</div>`

}

const gulliesPopup = (feature, layer) => {
  var content = getcontent_gullies(feature)

  layer.bindPopup(content)
}

const getcontent_gullies = feature => {
  switch  (feature.properties.raise_new_job) {  
    case 1:
        return gulliesActivePopup(feature)
    case 2:
        return gulliesMaintenancePopup(feature)
    case 3:
        return gulliesFaultPopup(feature)    
  }
}

export {
  gulliesPopup 
}