import {baseUrl} from "./config.js"
export default ( options = {} )=>{
	return new Promise( (resolve,reject)=>{
		uni.request({
			url:baseUrl + options.url,
			data:options.data || {},
			method:options.method || 'GET',
			header:options.header || {
				'content-type':"application/x-www-form-urlencoded"
			},
			success:resolve,
			fail:reject
		})
	} )
	}