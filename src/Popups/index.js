import { getTargetUrl } from '../Helpers'

const gulliesActivePopup = feature => {
  //const varName = getTargetUrl()

  return `<div class="item"><i class="tag fa fa-map-marker"></i><p class="title">Location </p><p class="info">${feature.properties.street}</p></div><hr/>
  <div class="item"><i class="tag fa fa-tag"></i><p class="title">Number on grid </p><p class="info">${feature.properties.central_asset_id}</p></div>
  <a class="button-primary" href="report-an-issue/additional-info?SiteCode=${feature.properties.site_code}&AssetId=${feature.properties.central_asset_id}&Easting=${feature.properties.easting}&Northing=${feature.properties.northing}">Report this gully</a>`
}

const gulliesFaultPopup = feature => {
 const varName = getTargetUrl()
 let noOfDays = Math.floor(
   (new Date() - new Date(feature.properties.job_entry_date)) /
     (1000 * 3600 * 24)
 )
 let lastUpdated = Math.floor(
   (new Date() - new Date(feature.properties.logged_date)) / (1000 * 3600 * 24)
 )
 const defaultMessage = noOfDays
   ? `A fault with this gully was reported ${noOfDays} days ago`
   : 'A fault with this gully was reported'
 const showLastUpdated = lastUpdated
   ? `<div class="last-updated">Last updated ${lastUpdated} days ago</div>`
   : ''

 return `<div class="item"><i class="tag fa fa-map-marker"></i><p class="title">Location </p><p class="info">${feature.properties.street}</p></div><hr>
    <div class="item"><i class="tag fa fa-tag"></i><p class="title">Number on grid </p><p class="info">${feature.properties.central_asset_id}</p></div>
    <div class= "message-fault">${defaultMessage}</div>
    <a class="button-primary" href="${varName}/track-a-report/details/${feature.properties.ext_system_ref}">View reported fault</a>
    ${showLastUpdated}`

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