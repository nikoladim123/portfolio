document.body.addEventListener('click', function(event){
    const holder = document.getElementById('holder');
    
    holder.classList.toggle('hidden');

    if (event.target.tagName === 'IMG'){
        event.target.classList.add('active-image');
        event.target.classList.remove('zoom');
       
    }
    
    if (holder.classList.contains('hidden')){
        
        const slike = document.querySelectorAll('img');
        for (let i = 0; i < slike.length; i++) {
            slike[i].classList.remove('active-image');
            slike[i].classList.add('zoom');
            
    }
      
  } 

});
