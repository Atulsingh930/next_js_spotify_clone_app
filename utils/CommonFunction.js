export function secondToTime(second){
    const min = Math.floor(second / 60)
    const sec = Math.floor(second % 60)
    if(min>0){
        return `${min}:${sec < 10 ? '0' + sec : sec}`
    }else{
        return sec < 10 ? '0' + sec : sec
    }
}

export function secondToHourTime(second){
    const hr = Math.floor(second / 3600);
    const min = Math.floor(Math.floor(second % 3600) / 60);
    if(hr<=0){
        return `${min} min`
    }else{
        return `${hr} hr ${min} min`
    }
}

export function formatNo(num){
    return num.toLocaleString('en-US');
}

export function shuffle(array) {
    // Loop through array starting at the last index
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
  
      // Swap elements at indexes i and j
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

export function artistAppearFind(artistID, dataArray){
    //console.log(dataArray, 'dataArray')
    let answer;
    if(dataArray[0].type==='') {
        answer = dataArray.filter((artist)=>!artist.primaryArtistsId.split(", ").includes(artistID))
        //console.log('songs artistAppearFind', answer)
    } else{
        //console.log('albums artistAppearFind')
        return dataArray.filter((artist)=>!artist.primaryArtists.some((artists)=>artists.id ===artistID));
    }return answer
}

export function artistMainFind(artistID, dataArray){
    //console.log(artistID, 'dataArray')
    let answer;
    if(dataArray[0].type==='') {
        answer = dataArray.filter((artist)=>artist.primaryArtistsId.split(", ").includes(artistID))
        //console.log('songs artistAppearFind', answer)
    } else{
        //console.log('albums artistAppearFind')
        return dataArray.filter((artist)=>artist.primaryArtists.some((artists)=>artists.id ===artistID));
    }return answer
}