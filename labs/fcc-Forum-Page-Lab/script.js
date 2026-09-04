const forumLatest =
    'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
    299: { category: 'Career Advice', className: 'career' },
    409: { category: 'Project Feedback', className: 'feedback' },
    417: { category: 'freeCodeCamp Support', className: 'support' },
    421: { category: 'JavaScript', className: 'javascript' },
    423: { category: 'HTML - CSS', className: 'html-css' },
    424: { category: 'Python', className: 'python' },
    432: { category: 'You Can Do This!', className: 'motivation' },
    560: { category: 'Back-End Development', className: 'backend' }
};

function timeAgo(time) {
    const currentDate = new Date();
    const passedDate = new Date(time);

    const timePassed = currentDate - passedDate

    const minutes = Math.floor(timePassed / (1000 * 60));
    const hours = Math.floor(timePassed / (1000 * 60 * 60))
    const days = Math.floor(timePassed / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
        return `${minutes}m ago`
    } else if (hours < 24) {
        return `${hours}h ago`
    } else {
        return `${days}d ago`
    }
}

function viewCount(views) {
    if (views >= 1000) {
        return `${Math.floor(views / 1000)}k`
    } else {
        return views;
    }
}

function forumCategory(id) {
    if (Object.hasOwn(allCategories, id)) {
        return `
      <a class="category ${allCategories[id].className}" href="${forumCategoryUrl}${allCategories[id].className}/${id}">${allCategories[id].category}</a>
    `;
    } else {
        return `
      <a class="category general" href="${forumCategoryUrl}general/${id}">${allCategories[id]?.category ?? 'General'}</a>
    `;
    }
}

function avatars(posters, users) {
    let imgEl = "";
    for (let i = 0; i < posters.length; i++) {
        const user = users.find(u => u.id === posters[i].user_id);
        let src = user.avatar_template
        if (src.startsWith("/")) {
            src = avatarUrl + src
        }
        imgEl += `<img src="${src.replace("{size}", 30)}" alt="${user.name}">`
    }
    return imgEl;
}

function showLatestPosts(obj) {
    const { users, topic_list: { topics } } = obj;

    for (let i = 0; i < topics.length; i++) {
        const { id, title, views, posts_count, slug, posters, category_id, bumped_at } = topics[i];

        document.getElementById("posts-container").innerHTML += `<tr>
     <td>
     <a class="post-title" href="${forumTopicUrl}${slug}/${id}">${title}</a>
     ${forumCategory(category_id)}
     </td>
     <td>
     <div class="avatar-container">${avatars(posters, users)}</div>
     </td>
     <td>${posts_count - 1}</td>
     <td>${viewCount(views)}</td>
     <td>${timeAgo(bumped_at)}</td>
    </tr>`
    }
}

async function fetchData() {
    try {
        fetch(forumLatest)
            .then(res => res.json())
            .then(data => showLatestPosts(data))
    } catch (err) {
        console.log(err)
    }
}

fetchData();
