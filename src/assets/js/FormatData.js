export const FormatData = function(data){
    let data_format = []
    for (let i = 0; i < data.length; i++) {
        let obj = new Object();
        obj.id = data[i].shortURL.id;
        obj.key = data[i].shortURL.id;
        obj.short = data[i].shortURL.short;
        obj.url = data[i].shortURL.url;
        obj.user_id = data[i].thirdToken.user_id;
        obj.app_name = data[i].thirdToken.app_name;
        data_format.push(obj)
    }
    return data_format
}