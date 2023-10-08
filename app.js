const API_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_ALBUMS = 'https://jsonplaceholder.typicode.com/albums';
const API_PHOTOS = 'https://jsonplaceholder.typicode.com/photos';

const API_SINGLE_USER = 'https://jsonplaceholder.typicode.com/todos?userId=';


class ApiReader {
    constructor(sourceId = 'source') {
        this.source = document.querySelector(`#${sourceId}`)
    }
    
    async getAllUsers(){
        let data = await fetch(API_USERS)
        return data.json()
    }

    async renderUsers(){
        let template = '<table class="table">';
        await this.getAllUsers().then(data => {
            console.log(data)
            data.forEach(item =>{
                template += `
                    <tr>
                        <td class="table-primary">${item.id}</td>
                        <td class="table-secondary">${item.name}</td>
                        <td class="table-light">${item.username}</td>
                        <td class="table-success">${item.email}</td>
                        <td class="table-info">${item.phone}</td>
                    </tr>    
                `;
            });
        });
        template += '</table>';
        document.getElementById(`result`).innerHTML = template; // доводиться робити вибір елементу тут через те що наш джаваскрипт файл
                                                                // потрібно ініціалізувати в початку файла для того щоб при ініціалізації
                                                                // кнопка яка обирає усіх користувачів змогла законектити онклік івент
                                                                // з цим файлом
    }

    async getUser(id){
        let data = await fetch(API_SINGLE_USER.concat(id))
        return data.json()
    }

    async renderUserTasks(id){
        let template = '<table class="table">';
        await this.getUser(id).then(data => {
            data.forEach(item =>{
                template += `
                    <tr>
                        <td class="table-primary">${item.id}</td>
                        <td class="table-secondary">${item.title}</td>
                        <td class="table-light">${item.completed}</td>
                    </tr>    
                `;
            });
        });
        template += '</table>';
        document.getElementById(`result`).innerHTML = template; // теж саме що й у минулій функції
    }
}

const api = new ApiReader();
