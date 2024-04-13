
const createUserPartCard = (name, phone, email)=>{

  const userWrapper = document.createElement('div');
  userWrapper.classList.add('user-wrapper');

  const userIcon = document.createElement('img');
  userIcon.classList.add('user-icon');
  userIcon.alt = 'user icon';
  userIcon.src = './assets/iconUser.png';

  const userInfoWrapper = document.createElement('div');
  userInfoWrapper.classList.add('user-info');

  const userName = document.createElement('h3');
  userName.classList.add('user-title');
  userName.textContent = name;

  const userPhone = document.createElement('p');
  const userEmail = document.createElement('p');
  const divider = document.createElement('span');
  divider.textContent = ' / '
  userPhone.classList.add('user-subtitle');
  userEmail.classList.add('user-subtitle')
  userPhone.textContent = phone;
  userEmail.textContent = email;

  const userSubInfoWrapper = document.createElement('div');
  userSubInfoWrapper.classList.add('user-subtitle-info');
  userEmail.append(divider);
  userSubInfoWrapper.append(userEmail, userPhone);
  userInfoWrapper.append(userName, userSubInfoWrapper);
  userWrapper.append(userIcon, userInfoWrapper);

  return userWrapper;

}

const createPostInfoCard = (title, body)=>{

  const postInfoWrapper = document.createElement('div');
  postInfoWrapper.classList.add('post-info-wrapper');
  const postTitle = document.createElement('h3');
  postTitle.textContent = title;
  postTitle.classList.add('post-title');
  const postSubtitle = document.createElement('p');
  postSubtitle.textContent = body;
  postSubtitle.classList.add('post-subtitle');
  postInfoWrapper.append(postTitle,postSubtitle);
  return postInfoWrapper ;
}



const createCardForPost = (cardObj)=>{
  const {id,title, body,name, phone, email} = cardObj;
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card-wrapper');
  cardWrapper.setAttribute('id',id);
  const userWrapper = createUserPartCard(name,phone,email)
  const postWrapper = createPostInfoCard(title, body)
  cardWrapper.append(userWrapper,postWrapper);
  return cardWrapper;
 
}

export const renderStaticContent = ()=>{
  const headerWrapper = document.createElement('header');
  headerWrapper.classList.add('header');
  const headerTitle = document.createElement('h1');
  headerTitle.classList.add('header-title');
  headerTitle.textContent = 'Posts';

  const input = document.createElement('input')
  input.placeholder = 'Search for...'
  input.classList.add('header-input');
  const pageNumber = document.createElement('p');
  pageNumber.textContent = 'page 1'
  pageNumber.classList.add('header-page-number');
  headerWrapper.append(headerTitle, pageNumber, input);
  const cardsWrapper = document.createElement('main');
  cardsWrapper.classList.add('cards-wrapper');

  
  document.body.append(headerWrapper, cardsWrapper);

  return [input,cardsWrapper];
}

export const renderPosts = (cards)=>{
  const cardsWrapper = document.querySelector('.cards-wrapper');
  const pageNumber = document.querySelector('.header-page-number');
  const nothingFoundMessage = document.createElement('h2');
  nothingFoundMessage.textContent = 'Nothing found';
  nothingFoundMessage.classList.add('message');
  pageNumber.textContent = 'page 1'
  cardsWrapper.innerHTML = '';
  const cardElements = cards.map((card)=>createCardForPost(card));
  if(cards.length>0){
    cardsWrapper.append(...cardElements);
  }else{
    cardsWrapper.append(nothingFoundMessage)
  } 
} 

export const reRenderPosts = (cards, page)=>{
  const cardsWrapper = document.querySelector('.cards-wrapper');
  const pageNumber = document.querySelector('.header-page-number');
  const cardElements = cards.map((card)=>createCardForPost(card));
  pageNumber.textContent = `page ${page}`
  cardsWrapper.append(...cardElements);
} 


