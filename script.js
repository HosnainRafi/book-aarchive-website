const bookList = () => {
    const searchText = document.getElementById('search-input').value;
    document.getElementById('search-input').value = '';
    document.getElementById('spinner').classList.remove('d-none');

    //When input is null
    if (searchText === 0) {
        document.getElementById('spinner').classList.add('d-none');
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
    }
    //when search anything
    else{
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
     fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data))
    }
    
}

const displayResult = books => {
    // console.log(books);
    const bookInfo = books.docs.slice(0, 30);
    // console.log(bookInfo);

    //spinner
    document.getElementById('spinner').classList.add('d-none');
    const searchResult = document.getElementById('search-result');
    const section = document.getElementById('section');
    searchResult.textContent = '';
    //Book count Area
    const h1 = document.createElement('h1');
    h1.classList.add('book-count');
    section.textContent = '';
    h1.innerHTML = `Books available : ${books.numFound}`
    section.appendChild(h1);

    if (bookInfo.length === 0) {
        searchResult.innerHTML = `
        <h2 class = 'bg-warning w-75 mx-auto text-center rounded-3 text-white'> Please Enter a valid book name</h2>
        `
    }
    
    else{
        bookInfo.forEach(book => {
            //For error handling
            let coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            if (book.cover_i === undefined) {
                coverUrl = ``;
            }
            //book name
            const bookName = book.title;

            //author name, publisher name, publisher years
            let { author_name, publisher, first_publish_year } = book;
            // author is found or not
            if (author_name === undefined) {
                author_name = 'Author Not Found';
            } else {
                author_name = author_name[0];
            }
            //publication year is found or not
            if (first_publish_year === undefined) {
                first_publish_year = 'Not Found';
            }

            // publisher is found or not
            if (publisher === undefined) {
                publisher = 'publisher Not Found'
            } else {
                publisher = publisher[0];
            }
            
            

            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-40">
                <img src="${coverUrl}" class="card-img-top img-fluid" height = '100px' alt="Cover Photo not found">
                <div class="card-body">
                    <h4 class= 'text-center card-title'>Book name : ${bookName} </h4>
                    <div class = 'card-text'>
                        <h5>Author Name: ${author_name}</h5>
                        <h5>Publish Year: ${first_publish_year}</h5>
                        <h5>Publisher : ${publisher}</h5>
                    </div>
                </div>
                <div class="card-footer">
                        <small class="text-muted"> ${ publisher}</small>
                </div>
            </div>
            `
            
            searchResult.appendChild(div);
        })
    }

}