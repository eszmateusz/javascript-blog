{
  'use strict';

  const titleClickHandler = function(event) {

    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
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
    console.log('target article', targetArticle);
  };

  // 7.2 Lista tytulow, lewy sidebar

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.list.tags';
    const optCloudClassCount = 5;
    const optCloudClassPrefix = 'tag-size-';

  const generateTitleLinks = function(customSelector = '') {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('articles', articles);
  
    for (let article of articles) {
    
      /* [DONE] get the article id */
  
      const articleId = article.getAttribute('id');
      console.log('articleId', articleId);

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  
  };

  generateTitleLinks();

  /* Calculate parameters */

  const calculateTagsParams = function (tags) {
    console.log('tags', tags);
    const params = {'min':9999, 'max':0};
    const normalizedCount = optCloudClassCount - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    console.log('classNumber', classNumber);

    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
      console.log('params', params);
      return optCloudClassPrefix + classNumber;
    }
  };

  // 7.2 Druga czesc dodawania tagow

  const generateTags = function() {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
  
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles:', articles);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
  
      /* [DONE] find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      console.log('tagList', tagList);

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
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + ' ' + '</span></a></li>';

        /* [DONE] add generated code to html variable */
        html = html + ' ' + linkHTML;
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
  };

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log('tagList', tagList);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a class="calculateTagsParams(allTags[tag], tagsParams)" href="#tag-' + tag  + '"><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a></li>';

  /* [NEW] END LOOP: for each tag in allTags: */

}

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;

};

//  const tagList = document.querySelector('.tags');
//  console.log('tag list',tagList);

  generateTags();

  // 7.2 Aktywnosc po kliknieciu

  const tagClickHandler = function(event) {

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
    const activeTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each active tag link */
    for (let activeTag of activeTagLinks) {

      /* [DONE] remove class active */
      activeTag.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(href);
    console.log('tagLinks', tagLinks);

    /* [DONE] START LOOP: for each found tag link */
    for (const tagLink of tagLinks) {

      /* [DONE] add class active */
      tagLink.classList.add('active');

      /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function() {
    
    /* [DONE] find all links to tags */
    const tags = document.querySelectorAll('a[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */
    for (let link of tags) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  // 7.2 Dodaje generate authors

  const generateAuthors = function() {

    const optAuthorSelector = '.post-author';

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const authorTags = article.getAttribute('data-author');

      /* [DONE] generate HTML of the link */
      const linkHTML = '<p><a href="#author-' + authorTags + '"><span>' + authorTags  + '</span></a></p>';
    
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      console.log('', html);

      const author = article.querySelector(optAuthorSelector);
      console.log('tag', author);
    
      /* [DONE] insert HTML of all the links into the tags wrapper */
      author.innerHTML = html;

      /* [DONE] END LOOP: for every article */
    }
  };

  generateAuthors();
  console.log('generate Authors:', generateAuthors);

  const authorClickHandler = function(event) {

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this; 

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* [DONE] find all tag links with class active */
    const authorTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each active tag link */
    for (let authorTag of authorTagLinks) {
      console.log('author Tag', authorTag);

      /* [DONE] remove class active */
      authorTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(href);

    /* [DONE] START LOOP: for each found tag link */
    for (const authorLink of authorLinks) {

      /* [DONE] add class active */
      authorLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  };

  const addClickListenersToAuthors = function() {

    /* [DONE] find all links to author */
    const author = document.querySelectorAll('a[href^="#author-"]');

    /* [DONE] START LOOP: for each link */
    for (let authorLink of author) {

      /* [DONE] add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
    }

  };

  addClickListenersToAuthors();

};