const API_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_ALBUMS = 'https://jsonplaceholder.typicode.com/albums';
const API_PHOTOS = 'https://jsonplaceholder.typicode.com/photos';

const API_SINGLE_USER = ' https://jsonplaceholder.typicode.com/posts?userId=';


customElements.define(
    "user-post",
    class extends HTMLElement {
      constructor() {
        super();
        const template = document.getElementById(
          "post-template",
        ).content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.cloneNode(true));
      }
    },
);

customElements.define(
    "user-card",
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById(
            "user-template",
            ).content;
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.cloneNode(true));
        }
        
        btnClick(callback) {
            this.shadowRoot.querySelector('.btn-toPosts').addEventListener('click', callback);
        }
    },
)

class ApiReader {
    constructor(sourceId = 'source') {
        this.source = document.querySelector(`#${sourceId}`)
    }

    static getData(url) {
        return fetch(url)
            .then((res) => { 
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}, Text: ${res.statusText}`);
                }
                return res.json();
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
                throw error; 
            });
    }

    static getAllUsers(){
        const url = 'https://jsonplaceholder.typicode.com/users';
        return this.getData(url)
    }

    static getUser(id){
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;
        return this.getData(url);
    }

}

class Renderer{
    constructor(){
        this.users = [];
        this.posts = [];
    }

    async renderUsers(){
        let result = document.getElementById(`result`);
        await ApiReader.getAllUsers().then(data => {
            result.innerHTML = ``;
            data.forEach(item =>{
                let template = document.createElement('user-card');
                template.innerHTML = `
                    <span slot="user-name">${item.name}</span>
                    <span slot="user-userName">${item.username}</span>
                    <span slot="user-phone">${item.phone}</span>
                    <span slot="user-email">${item.email}</span>
                `;
                result.appendChild(template)

                template.btnClick( () => {
                    this.renderUserTasks(parseInt(item.id))
                })
            });
        });
    }

    async renderUserTasks(id){
        let posts = document.getElementById(`posts`);
        await ApiReader.getUser(id).then(data => {
            posts.innerHTML = ``;
            data.forEach(item =>{
                let template = document.createElement('user-post');
                template.innerHTML = `
                    <span slot="postID">${item.id}</span>
                    <span slot="title">${item.title}</span>
                    <span slot="attributes">${item.body}</span>
                `;
                posts.appendChild(template)
            })
        });
        return posts;
    }     
}


const renderer = new Renderer();