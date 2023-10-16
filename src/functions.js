//format the name of the item to match the file name format
export const getCoverImg = function(name) {
    let lowerCaseName = name.toLowerCase();
    let fileName = lowerCaseName.replace(/\s/g, '-');
    return fileName;
  };


  //make sure first letter is capital
 export const capitalizeFirstLetter = function(string) {

    return (string[0].toUpperCase() +
      string.slice(1));
  };
