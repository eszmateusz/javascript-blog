{
  'use strict';

  const opt = {
    cloud: {
      classCount: 5,
      classPrefix: 'tag-size-',
    },
  },

  const select = {
    all: {
      articles: '.post',
    },
    article: {
      title: '.post-title',
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  // const select.all.articles = '.post',
  //   select.article.title = '.post-title',
  //   select.listOf.titles = '.titles',
  //   select.article.tags = '.post-tags .list',
  //   select.article.author = '.post-author',
  //   select.listOf.tags = '.tags.list',
  //   select.listOf.authors = '.authors.list';

  function titleClickHandler(event) {

    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
      console.log('activeArticle', activeArticle);
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('targetArticle', targetArticle);
  }

  // 7.2 Lista tytulow, lewy sidebar

//  const optArticleSelector = '.post',
//    optTitleSelector = '.post-title',
//    optTitleListSelector = '.titles',
//    optArticleTagsSelector = '.post-tags .list',
//    optTagsListSelector = '.list.tags',
//    optCloudClassCount = 5,
//    optCloudClassPrefix = 'tag-size-',
//    optAuthorListSelector = '.post-author';

  function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    console.log('articles', articles);
  
    let html = '';

    for (let article of articles) {
    
      /* [DONE] get the article id */
  
      const articleId = article.getAttribute('id');
      console.log('articleId', articleId);

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(select.article.title).innerHTML;
      
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  
  }
 
  generateTitleLinks();

  /* Calculate parameters */

  function calculateTagsParams(tags) {
    console.log('tags', tags);
    const params = {min: 999999, max: 0};

    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloud.classCount - 1) + 1 );
    console.log('classNumber', classNumber);
    return opt.cloud.classPrefix + classNumber;
  }

  // 7.2 Druga czesc dodawania tagow

  function generateTags() {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    console.log('allTags', allTags);
  
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles:', articles);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
  
      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);
      console.log('tagsWrapper', tagsWrapper);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags', articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag', tag);

        /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
        console.log('html', html);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
    }

  /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);
  console.log('tagList', tagList);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {

    const linkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li> ';
    console.log('linkHTML', linkHTML);
    
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += linkHTML;

  /* [NEW] END LOOP: for each tag in allTags: */
}

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;

}

generateTags();
console.log('generateTags', generateTags);

// 7.2 Aktywnosc po kliknieciu

function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* [DONE] remove class active */
    activeTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const sameTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log('sameTags', sameTags);

  /* [DONE] START LOOP: for each found tag link */
  for (let sameTag of sameTags) {

    /* [DONE] add class active */
    sameTag.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
    
  /* [DONE] find all links to tags */
  const tags = document.querySelectorAll('a[href^="#tag-"]');

  /* [DONE] START LOOP: for each link */
  for (let tag of tags) {

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }

}

addClickListenersToTags();
/*
// 7.2 Dodaje generate authors
//Generate authors - poczatek chmury linkow

function calculateAuthorsParams = function(authors) {
  const params = {'min':9999, 'max':0};

  for(let authorTag in authors) {
    params.max = authors[authorTag] > params.max ? authors[authorTag] : params.max;
    params.min = authors[authorTag] < params.min ? authors[authorTag] : params.min;
    console.log('params', params);
  }

  return params;
};

const calculateAuthorsClass = function(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  console.log('klass author numer',classNumber);
  return optCloudClassPrefix + classNumber;
}; */

function generateAuthors() {

  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};    
  console.log('allAuthors',allAuthors);

  /* [DONE] find all authors */
  const articles = document.querySelectorAll(select.all.articles);

  /* [DONE] START LOOP: for every author: */
  for (let article of articles) {

      /* [DONE] find authors wrapper */
      const authorsWrapper = article.querySelector(select.article.author);
      authorsWrapper.innerHTML = '';

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get author name from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* generate and add HTML of the link to html variable */
      html = '<p>by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></p>';
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* insert HTML into the authors wrapper */
      authorsWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article */
    }

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
        
    for(let author in allAuthors) {

      const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a> (' + allAuthors[author] + ')</li> ';

      /* [NEW] generate code of a link and add it to allTagsHTML */
      allAuthorsHTML += linkHTML;
      console.log('allAuthorsTagsHTML', allAuthorsHTML);

      /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = allAuthorsHTML;
    console.log('authorListInner', authorList);  

  }

  generateAuthors();
  console.log('generateAuthors:', generateAuthors);

  function authorClickHandler(event) {

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this; 

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* [DONE] find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {
      console.log('authorTag', authorTag);

      /* [DONE] remove class active */
      activeAuthor.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all author links with "href" attribute equal to the "href" constant */
    const sameAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found tag link */
    for (let sameAuthor of sameAuthors) {

      /* [DONE] add class active */
      sameAuthor.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors() {

    /* [DONE] find all links to authors */
    const authors = document.querySelectorAll('a[href^="#author-"]');

    /* [DONE] START LOOP: for each link */
    for (let author of authors) {

      /* [DONE] add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
  }

addClickListenersToAuthors();

}