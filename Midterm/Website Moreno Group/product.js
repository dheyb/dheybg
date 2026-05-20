// search 
const search = () =>{
    const searchbox = document.getElementById('search-item').value.toUpperCase();

    const storeitem = document.getElementById('prof');

    const product = document.querySelectorAll('.pro');

    const sname = document.getElementsByTagName('h5');

    for(var i = 0;i<=sname.length;i++){
        let match=product[i].getElementsByTagName('h5')[0];

    if(match){
        let textvalue=match.textContent || match.innerHTML

        if(textvalue.toUpperCase().indexOf(searchbox) > -1){
            product[i].style.display="";
        }
        else{
            product[i].style.display="none";
        }
    }
}
}