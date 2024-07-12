// runPlugin.js
import { promises as fs, read, readdir } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const defaultOptions = {
  compath: "./src/components", // Adjusted to relative path from the script directory
  output: "./src/components/index.js", // Adjusted to relative path from the script directory，
  regexp: /.(vue|jsx)/,
  prefix:'h'
};
async function readDir(dirpath) {

  const dirents = await fs.readdir(dirpath, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dirent.parentPath, dirent.name);
      return dirent.isDirectory() ? readDir(res) : res;
    })
  );
  return Array.prototype.flat.call(files, Infinity);
}
async function runPlugin() {
  const config = JSON.parse(await fs.readFile(path.resolve('./export.config.json')));
  const options = Object.assign(defaultOptions,config);

  console.log(options);
  const { compath, output, regexp ,prefix} = options;
  const currentDir = path.dirname(fileURLToPath(import.meta.url));

  const componentsPath = path.resolve(currentDir, compath);
  const files = await readDir(componentsPath);
  const comName = [];

  try {
    const imports = files
      .filter((file) => new RegExp(regexp).test(file))
      .map(
        (file) => {
          const dirname = path.dirname(file); // 父级目录
          const extname = path.extname(file); // 扩展名

          const componentName = path.basename(file, extname); //扩展名
          const fullPath = path.join(dirname, "index.js");
          const string = `import ${componentName} from './${componentName}${extname}';
${componentName}.install=(app)=>{
 app.component('${prefix}${componentName.replace(/^\w/, c => c.toUpperCase())}',${componentName})
};
export default ${componentName}
`;
          fs.writeFile(fullPath, string.trim());
          comName.push(componentName);
          return `import ${componentName} from '${path
            .relative(currentDir, fullPath)
            .replace(/\\/g, "/")}';`;
        }
        // 转相对路劲，分隔符转换
      )
      .join("\n");

    // Resolve output file path
    const outputFile = path.resolve(currentDir, output);

    await fs.writeFile(outputFile, imports, { flag: "w+" });
    const str = `\nexport const components = {\n  ${comName.join(",\n  ")}\n};`;
    await fs.writeFile(outputFile, str, { flag: "a+" });
    console.log("Components have been successfully imported.");
  } catch (error) {
    console.error("Error importing components:", error);
  }
}

runPlugin();
