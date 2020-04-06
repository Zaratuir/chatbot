fs = require ('fs');

class fileManager{
    static async getDirArray(path){
        let dirArr = [];
        let error = false;
        let dir = await fs.promises.opendir(path);
        try{
            let dirent;
            while(dirent = dir.readSync()){
                if(dirent.isDirectory()){
                    dirArr.push(dirent.name);
                }
            }
        } catch(e) {
            error = true;
        } finally {
            dir.close();
        }
        return dirArr;
    }
}

module.exports = fileManager;