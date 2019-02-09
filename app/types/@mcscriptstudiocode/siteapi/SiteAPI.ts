declare let SiteApi: {
  loadSite: (
    host: string | {host?:string,path?:string,protocoll?:"https"|"http"},
    then: Function,
    path?: string,
    protocoll?: string
  ) => Promise<any>;
  parseURL: (
    url: string
  ) => { host: string | any; path: string; protocoll: "http" | "https" };
  downloadFile: (out: string, url: string) => Promise<number>;
}

let {downloadFile,loadSite,parseURL} = SiteApi

export {downloadFile,loadSite,parseURL}
module.exports = SiteApi
