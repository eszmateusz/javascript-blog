{

  'use strict';

  const opt = {
    cloud: {
      classCount: 5,
      classPrefix: 'tag-size-',
    },
  };

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

  / 7.2 /
  function titleClickHandler(event) {

    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] 7.2 remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] 7.2 add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] 7.2 remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
      console.log('activeArticle', activeArticle);
    }

    /* [DONE] 7.2 get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] 7.2 find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] 7.2 add class 'active' to the correct article */
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

  / 7.2-7.3 /
  function generateTitleLinks(customSelector = '') {

    /* [DONE] 7.2/7.3 remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* [DONE] 7.2/7.3 for each article */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    console.log('articles', articles);
  
    / 7.3 /
    let html = '';
    
    / 7.2 /
    for (let article of articles) {
    
      /* [DONE] 7.2 get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleId', articleId);

      /* [DONE] 7.2/7.3 find the title element */
      /* [DONE] 7.2/7.3 get the title from the title element */
      const articleTitle = article.querySelector(select.article.title).innerHTML;
      
      /* [DONE] 7.2 create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] 7.2 insert link into titleList */
      html = html + linkHTML;
    }

    / 7.2 /
    titleList.innerHTML = html;

    / 7.2 / 
    const links = document.querySelectorAll('.titles a');
    console.log(links);

    / 7.2 /
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  
  }
 
  generateTitleLinks();

  /* 7.3 Calculate parameters - zaczynam */
  / 7.3 /
  function calculateTagsParams(tags) {
    console.log('tags', tags);
    const params = { max: 0, min: 999999 };

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

  / 7.3 /
  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloud.classCount - 1) + 1);
    console.log('classNumber', classNumber);
    
    return opt.cloud.classPrefix + classNumber;
  }
  /* 7.3 Calculate parameters - koniec */

  // 7.2 Druga czesc dodawania tagow
  / 7.2-7.3 /
  function generateTags() {

    /* [NEW] 7.3 create a new variable allTags with an empty array */
    let allTags = {};
    console.log('allTags', allTags);
  
    /* [DONE] 7.2/7.3  find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    console.log('articles:', articles);

    /* [DONE] 7.2 START LOOP: for every article: */
    for (let article of articles) {
  
      /* [DONE] 7.2/7.3 find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);
      console.log('tagsWrapper', tagsWrapper);
      tagsWrapper.innerHTML = '';

      /* [DONE] 7.3 make html variable with empty string */
      let html = '';

      /* [DONE] 7.2 get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags', articleTags);

      /* [DONE] 7.2 split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* [DONE] 7.2 START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag', tag);

        /* [DONE] 7.2 generate HTML of the link */
        const linkHTML = ' <li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

        /* [DONE] 7.2 add generated code to html variable */
        html = html + linkHTML;
        console.log('html', html);

        /* [NEW] 7.3 check if this link is NOT already in allTags */
        if (!allTags[tag]) {
        
          /* [NEW] 7.3 add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* [DONE] 7.2 END LOOP: for each tag */
      }

      /* [DONE] 7.2 insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    /* [DONE] 7.2 END LOOP: for every article: */
    }

    /* [NEW] 7.3 find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);
    console.log('tagList', tagList);

    / 7.3 /
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] 7.3 create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] 7.3 START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

      / 7.3 /
      const linkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
      console.log('linkHTML', linkHTML);
    
      /* [NEW] 7.3 generate code of a link and add it to allTagsHTML */
      allTagsHTML += linkHTML;

    /* [NEW] 7.3 END LOOP: for each tag in allTags: */
    }

    /* [NEW] 7.3 add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  }

  generateTags();

  // 7.2 Aktywnosc po kliknieciu

  / 7.2 /
  function tagClickHandler(event) {

    /* 7.2 prevent default action for this event */
    event.preventDefault();
    console.log(event);

    /* [DONE] 7.2 make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] 7.2 make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* [DONE] 7.2 make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* [DONE] 7.2 find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] 7.2 START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* [DONE] 7.2 remove class active */
      activeTag.classList.remove('active');

    /* [DONE] 7.2 END LOOP: for each active tag link */
    }

    /* [DONE] 7.2 find all tag links with "href" attribute equal to the "href" constant */
    const sameTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log('sameTags', sameTags);

    /* [DONE] 7.2 START LOOP: for each found tag link */
    for (let sameTag of sameTags) {

      /* [DONE] 7.2 add class active */
      sameTag.classList.add('active');

    /* [DONE] 7.2 END LOOP: for each found tag link */
    }

    /* [DONE] 7.2 execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  / 7.2 /
  function addClickListenersToTags() {
    
    /* [DONE] 7.2 find all links to tags */
    const tags = document.querySelectorAll('a[href^="#tag-"]');

    /* [DONE] 7.2 START LOOP: for each link */
    for (let tag of tags) {

      /* 7.2 add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);

    /* 7.2 END LOOP: for each link */
    }

  }

  addClickListenersToTags();

  // 7.2 Dodaje generate authors

  / 7.2-7.3 /
  function generateAuthors() {

    /* [NEW] 7.3 create a new variable allAuthors with an empty array */
    let allAuthors = {};    
    console.log('allAuthors',allAuthors);

    /* [DONE] 7.2/7.3 find all authors */
    const articles = document.querySelectorAll(select.all.articles);

    /* [DONE] 7.2 START LOOP: for every author: */
    for (let article of articles) {

      /* [DONE] 7.3 find authors wrapper */
      const authorsWrapper = article.querySelector(select.article.author);
      authorsWrapper.innerHTML = '';

      /* [DONE] 7.2 make html variable with empty string */
      let html = '';

      /* [DONE] 7.2 get author name from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* 7.3 generate and add HTML of the link to html variable */
      html = '<p>by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></p>';
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* 7.2 insert HTML into the authors wrapper */
      authorsWrapper.innerHTML = html;

    /* [DONE] 7.2 END LOOP: for every article */
    }

    /* [NEW] 7.3 find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);

    /* [NEW] 7.3 create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] 7.3 START LOOP: for each tag in allTags: */
    for(let author in allAuthors) {

      / 7.3 /
      const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a>(' + allAuthors[author] + ')</li>';

      /* [NEW] 7.3 generate code of a link and add it to allTagsHTML */
      allAuthorsHTML += linkHTML;
      console.log('allAuthorsTagsHTML', allAuthorsHTML);

    /* [NEW] 7.3 END LOOP: for each tag in allTags: */
    }

    /* [NEW] 7.3 add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = allAuthorsHTML;
    console.log('authorList', authorList);  

  }

  generateAuthors();

  / 7.2 /
  function authorClickHandler(event) {

    /* [DONE] 7.2 prevent default action for this event */
    event.preventDefault();

    /* [DONE] 7.2 make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this; 

    /* [DONE] 7.2 make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] 7.2 make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* [DONE] 7.2 find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] 7.2 START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {
      console.log('activeAuthor', activeAuthor);

      /* [DONE] 7.2 remove class active */
      activeAuthor.classList.remove('active');

      /* [DONE] 7.2 END LOOP: for each active tag link */
    }

    /* [DONE] 7.2 find all author links with "href" attribute equal to the "href" constant */
    const sameAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] 7.2 START LOOP: for each found tag link */
    for (let sameAuthor of sameAuthors) {

      /* [DONE] 7.2 add class active */
      sameAuthor.classList.add('active');

      /* [DONE] 7.2 END LOOP: for each found tag link */
    }

    /* [DONE] 7.2 execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  / 7.2 /
  function addClickListenersToAuthors() {

    /* [DONE] 7.2 find all links to authors */
    const authors = document.querySelectorAll('a[href^="#author-"]');

    /* [DONE] 7.2 START LOOP: for each link */
    for (let author of authors) {

      /* [DONE] 7.2 add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);

    /* [DONE] 7.2 END LOOP: for each link */
    }

  }

  addClickListenersToAuthors();

}