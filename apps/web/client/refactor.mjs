import fs from "fs";
import path from "path";

const srcDir = "/mnt/533172392EC44796/Kunal/V/projects/Neptune/Neptune/apps/web/client/src";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const UI_PATH_REGEX = /(["'])(?:@\/components\/ui|@\/ui|(?:\.\.\/)+components\/ui|(?:\.\.\/)+ui|components\/ui)\/(.*?)\1/g;
const ICON_PATH_REGEX = /(["'])(?:@\/assets\/icons|@\/icons|(?:\.\.\/)+assets\/icons|(?:\.\.\/)+icons|assets\/icons)\/(.*?)\1/g;

let count = 0;
walkDir(srcDir, function(filePath) {
  if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
    let content = fs.readFileSync(filePath, "utf-8");
    let initial = content;

    content = content.replace(UI_PATH_REGEX, '$1@repo/ui/$2$1');
    content = content.replace(ICON_PATH_REGEX, '$1@repo/icons/$2$1');

    if (content !== initial) {
      console.log(`Updated: ${filePath}`);
      fs.writeFileSync(filePath, content, "utf-8");
      count++;
    }
  }
});
console.log(`Updated ${count} files.`);
