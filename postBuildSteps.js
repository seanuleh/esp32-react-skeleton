const fs = require("fs");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

let regex = /pm\.(.*)\.js/;
let buildFilesPath = "./build/";

let buildFiles = fs.readdirSync(buildFilesPath);
let preCacheManifestFilename;

for (let i = 0; i < buildFiles.length; i++){
    if (buildFiles[i].match(regex)) {
        preCacheManifestFilename = buildFiles[i];
    }
}

let preCacheManifestHash = preCacheManifestFilename.match(regex)[1];
let preCacheManifestHashShort = preCacheManifestHash.slice(0,8);
let preCacheManifestFilenameShort = `pm.${preCacheManifestHashShort}.js`;

fs.renameSync(buildFilesPath+preCacheManifestFilename,buildFilesPath+preCacheManifestFilenameShort);

let assetManifestFilename = "asset-manifest.json";
let serviceWorkerFilename = "service-worker.js";

let assetManifest = fs.readFileSync(buildFilesPath+assetManifestFilename);
assetManifest = assetManifest.toString().replaceAll(preCacheManifestHash, preCacheManifestHashShort);
fs.writeFileSync(buildFilesPath+assetManifestFilename, assetManifest);

let serviceWorker = fs.readFileSync(buildFilesPath+serviceWorkerFilename);
serviceWorker = serviceWorker.toString().replaceAll(preCacheManifestHash, preCacheManifestHashShort);
fs.writeFileSync(buildFilesPath+serviceWorkerFilename, serviceWorker);
