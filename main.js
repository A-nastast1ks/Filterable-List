import {renderStaticContent,renderPosts,reRenderPosts} from './render.js'
import {URL_POSTS,URL_USERS,AMOUNT_OF_POSTS,SCROLL_PAGINATION_OFFSET,LIMIT,DELAY_MS} from './constants.js'

let page =1;
let search = '';
let isLoading = false;

const [inputElement,cardsWrapper] = renderStaticContent();


async function fetchPosts(query='', page, limit =LIMIT) {
  const paramsString = new URLSearchParams({
    title_like: query,
    _page: page,
    _limit: limit,
  }).toString();
  try{

  const url = `${URL_POSTS}?${paramsString}`;
  const response = await fetch(url);
  const posts = await response.json();

  const postUserPromises = posts.map(async post => {
    const userResponse = await fetch(`${URL_USERS}${post.userId}`);
    const userData = await userResponse.json();
    return { ...post, name: userData.name, phone: userData.phone, email: userData.email };
  });

  const postUserArray = await Promise.all(postUserPromises);

  return postUserArray;

  }catch(error){
    throw new Error('Something went wrong!!!')
  }
}

const debounce = (callback, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    return new Promise((resolve, reject) => {
      timerId = setTimeout(() => {
        callback(...args)
        .then((result)=>resolve(result))
        .catch((error)=>reject(error))
      }, delay);
    });
  };
};

const debouncedFunction = debounce(fetchPosts, DELAY_MS);

debouncedFunction(search,page)
.then((posts) => renderPosts(posts || []))
.catch((error)=>console.error(error))

inputElement.addEventListener('input', (e) => {
  const query = e.target.value
  search = query;
  page=1
  debouncedFunction(search,page )
  .then((posts) => renderPosts(posts || []))
  .catch((error) => console.error(error));
})




const scrollEventListener = () => {
  const element = cardsWrapper;
  if (
    element.scrollTop >=
    element.scrollHeight - element.offsetHeight - SCROLL_PAGINATION_OFFSET &&
    !isLoading
  ) {
    if ((page + 1) * 10 <= AMOUNT_OF_POSTS) {
      isLoading = true;
      page += 1;
      debouncedFunction(search, page)
        .then((posts) => {
          reRenderPosts(posts || [],page);
          isLoading = false;
          cardsWrapper.addEventListener('scroll', scrollEventListener);
        })
        .catch((error) => {
          isLoading = false;
          console.error(error);
        });
      cardsWrapper.removeEventListener('scroll', scrollEventListener);
    }
  }
};
cardsWrapper.addEventListener('scroll', scrollEventListener);