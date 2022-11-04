//loading
$(document).ready(function(){
  $('#loading').fadeOut(2000,function(){
    $('body').css('overflow','visible')
  $('#loading').remove();
  });
});
// toggle navbar
$('.menu-icon').click(function(){
    $('.nav-container').toggleClass('active');
    $('.menu-icon i').toggleClass('fa-times');
    $('.link1').animate({'opacity':1 ,'paddingTop':'20px'},1000);
    $('.link2').animate({'opacity':1 ,'paddingTop':'20px'},1200);
    $('.link3').animate({'opacity':1 ,'paddingTop':'20px'},1400);
    $('.link4').animate({'opacity':1 ,'paddingTop':'20px'},1600);
    $('.link5').animate({'opacity':1 ,'paddingTop':'20px'},1800);
});
//random meals
async function getRandomMeals(){
  let api=await fetch('https://themealdb.com/api/json/v1/1/search.php?s=');
  let random=await api.json();
  let randomMeal=random.meals;

  var cartona='';
  for(let i=0;i<20;i++){
    cartona+=`
    <div class="col-md-3 colImg">
        <div class="position-relative img-box">
        <a class="mm" href=""><img src="${randomMeal[i].strMealThumb}" alt="" class="w-100" style="border-radius:5px;" ></a>
        <div mName=${randomMeal[i].strMeal} class="overlay-meal d-flex align-items-center open">
        <h2 mName=${randomMeal[i].strMeal} class="open">${randomMeal[i].strMeal}</h2>
        </div>
        </div>
        </div>
    `
  };
  mealEl_container.innerHTML=cartona;

  $('.open').click(function(e){
    let mealDesc=$(e.target).attr('mName');
    mealInstruction(mealDesc);
  });
};
getRandomMeals();

//meal instruction
async function mealInstruction(theName){
  let api=await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${theName}`);
  let random=await api.json();
  let meals=random.meals;

  let cartona='';
  for(let i=0;i<1;i++){
    cartona+=`
    <div class="row py-4 text-white">
        <div class="col-md-4">
            <img class="w-100" src="${meals[i].strMealThumb}" alt="">
            <h2 class='text-center'>${meals[i].strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meals[i].strInstructions}</p>
            <h5>Area: <span>${meals[i].strArea}</span></h5>
            <h5>Category: <span>${meals[i].strCategory}</span></h5>
    
            <h2>Tags:</h2>
            <button class="btn btn-light my-2">${meals[i].strTags}</button> <br/>
            <a href='${meals[i].strSource}' class="btn btn-success" target='_blank'>Source</a>
            <a href='${meals[i].strYoutube}' class="btn btn-danger">Youtube</a>
            
        </div>
    `
  };
  mealEl_container.innerHTML=cartona;

};

//search
var mealEl_container=document.getElementById("meals-container");
var mainSection=document.getElementById('main-section');
var searchName=document.getElementById('searchInput');

function search(){
  $('.search-row').removeClass('displaynone');
  mealEl_container.innerHTML='';
};

$('.searchLink').click(function(){
  search();
});

async function getSearchName(name){
  let api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let mealsData= await api.json();
  let meals= mealsData.meals;

  let cartona=``
  for (let i = 0; i < meals.length; i++) {
      
      cartona +=`
       <div mName=${meals[i].strMeal} class="col-md-3 colImg open">
      <div class="position-relative img-box">
      <a class="mm" href=""><img src="${meals[i].strMealThumb}" alt="" class="w-100" style="border-radius:5px;" ></a>
      <div mName=${meals[i].strMeal} class="overlay-meal d-flex align-items-center open">
      <h2 mName=${meals[i].strMeal} class="open">${meals[i].strMeal}</h2>
      </div>
      </div>
      </div>`
  };

  mealEl_container.innerHTML=cartona;
  $('.open').click(function(e){
    let m=$(e.target).attr('mName');
    mealInstruction(m);
  });
};

$('#searchInput').keyup(function(){
  let nameValue=searchName.value;
  getSearchName(nameValue);
})


//search letter
var searchLetter=document.getElementById('inputLetter');
async function getSearchName(name){
  let api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
  let mealsData= await api.json();
  let meals= mealsData.meals;

  let cartona=``
  for (let i = 0; i < meals.length; i++) {
      
      cartona +=`
       <div mName=${meals[i].strMeal} class="col-md-3 colImg open">
      <div class="position-relative img-box">
      <a class="mm" href=""><img src="${meals[i].strMealThumb}" alt="" class="w-100" style="border-radius:5px;" ></a>
      <div mName=${meals[i].strMeal} class="overlay-meal d-flex align-items-center open">
      <h2 mName=${meals[i].strMeal} class="open">${meals[i].strMeal}</h2>
      </div>
      </div>
      </div>`
  };

  mealEl_container.innerHTML=cartona;
  $('.open').click(function(e){
    let m=$(e.target).attr('mName');
    mealInstruction(m);
  });
};

$('#inputLetter').keyup(function(){
  let letter=searchLetter.value;
  getSearchName(letter);
});

//categories
async function getCategories(){
  let categoryData= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let apiData=await categoryData.json();
  let categories=apiData.categories;

  let cartona='';
  for(let i=0;i<categories.length;i++){
    cartona+=`
    <div catName=${categories[i].strCategory} class="col-md-3 colImg open">
        <div class="position-relative img-box">
        <a class="mm" href=""><img src="${categories[i].strCategoryThumb}" alt="" class="w-100" style="border-radius:5px;" ></a>
        <div catName=${categories[i].strCategory} class="overlay-meal text-center open">
        <h2 catName=${categories[i].strCategory} class="open">${categories[i].strCategory}</h2>
        <p catName=${categories[i].strCategory} class="open">${categories[i].strCategoryDescription.split(' ').splice(0,10).join(' ') +"..."}</p>
        </div>
        </div>
        </div>`
  };
  $('.search-row').addClass('displaynone');
  mealEl_container.innerHTML=cartona;

  $('.open').click(function(e){
    let mealOfCategory=$(e.target).attr('catName');
    categoryMeal(mealOfCategory);
  });

};
async function categoryMeal(categoryMealName) {
    
  let catMeals= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryMealName}`)
  let mealsData= await catMeals.json()
  let meals= mealsData.meals
  let cartona=``

  for (let i = 0; i < meals.length; i++) {
      
      cartona +=
      `
      <div mName=${meals[i].strMeal} class="col-md-3 colImg open">
        <div class="position-relative img-box">
        <a class="mm" href=""><img src="${meals[i].strMealThumb}" alt="" class="w-100" style="border-radius:5px;" ></a>
        <div mName=${meals[i].strMeal} class="overlay-meal d-flex align-items-center open">
        <h2 mName=${meals[i].strMeal} class="open">${meals[i].strMeal}</h2>
        </div>
        </div>
        </div>
      
      `
  }
  mealEl_container.innerHTML=cartona;

  $('.open').click(function(e){
    let mealDesc=$(e.target).attr('mName');
    mealInstruction(mealDesc);
  });
};

$('.categoryLink').click(function(){
  getCategories()
})

//area
async function getAreas(){
  let api=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let apiData=await api.json();
  let areaName=apiData.meals;

  let cartona='';
  for(let i=0;i<areaName.length;i++){
    cartona+=`
    <div areaN=${areaName[i].strArea} class="col-md-3 colImg open shadow">
        <div areaN=${areaName[i].strArea} class=" img-box text-center open">
        <i areaN=${areaName[i].strArea} class="fa-solid fa-city fa-3x open"></i>
        <h2 areaN=${areaName[i].strArea} class="text-white open">${areaName[i].strArea}</h2>
        </div>
    </div>`
  }
  $('.search-row').addClass('displaynone');
  mealEl_container.innerHTML=cartona;

  $('.open').click(function(e){
    let area=$(e.target).attr('areaN');
    mealsArea(area);
  });
}

async function mealsArea(areaNa){
  let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaNa}`)
  let apiData=await api.json();
  let meals=apiData.meals;

  let cartona='';
  for (let i=0;i<meals.length;i++) {
    cartona+=`
    <div mName=${meals[i].strMeal} class="col-md-3 colImg open">
        <div class="position-relative img-box">
        <a class="mm" href=""><img src="${meals[i].strMealThumb}" alt="" class="w-100" style="border-radius:5px;" ></a>
        <div mName=${meals[i].strMeal} class="overlay-meal d-flex align-items-center open">
        <h2 mName=${meals[i].strMeal} class="open">${meals[i].strMeal}</h2>
        </div>
        </div>
        </div>`
    
  };
  mealEl_container.innerHTML=cartona;

$('.open').click(function(e){
    let mealDesc=$(e.target).attr('mName');
    mealInstruction(mealDesc);
  });
};

$('.areaLink').click(function(){
  getAreas()
})
//ingredient
/* <p gName=${meals[i].strIngredient} class="open">${meals[i].strDescription.split(" ").splice(0,20).join(" ")}</p> */

async function getIngredients(){
  let gData= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let apiData=await gData.json();
  let meals=apiData.meals;

  let cartona='';
  for(let i=0;i<20;i++){
    cartona+=`
    <div gName=${meals[i].strIngredient} class="col-md-3 colImg open shadow">
        <div gName=${meals[i].strIngredient} class=" img-box text-center open">
        <i gName=${meals[i].strIngredient} class="fa-solid fa-bowl-food fa-3x open"></i>
        <h2 gName=${meals[i].strIngredient} class="text-white open">${meals[i].strIngredient}</h2>
        <p gName=${meals[i].strIngredient} class="open text-white">It is one of the most common and widespread domestic , with a total population of more than...</p>
        </div>
    </div>`
  }
  $('.search-row').addClass('displaynone');
  mealEl_container.innerHTML=cartona;

  $('.open').click(function(e){
    let gg=$(e.target).attr('gName');
    mealsIngredeint(gg);
  });
}

async function mealsIngredeint(g){
  let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${g}`)
  let apiData=await api.json();
  let meals=apiData.meals;

  let cartona='';
  for (let i=0;i<meals.length;i++) {
    cartona+=`
    <div mName=${meals[i].strMeal} class="col-md-3 colImg open">
        <div class="position-relative img-box">
        <a class="mm" href=""><img src="${meals[i].strMealThumb}" alt="" class="w-100" style="border-radius:5px;" ></a>
        <div mName=${meals[i].strMeal} class="overlay-meal d-flex align-items-center open">
        <h2 mName=${meals[i].strMeal} class="open">${meals[i].strMeal}</h2>
        </div>
        </div>
        </div>`
    
  };
  mealEl_container.innerHTML=cartona;

$('.open').click(function(e){
    let mealDesc=$(e.target).attr('mName');
    mealInstruction(mealDesc);
  });
};

$('.gLink').click(function(){
  getIngredients()
})

//contat
function contact(){
  $('.search-row').addClass('displaynone');
  mealEl_container.innerHTML=`
  <div class="container">
        <h2 class="text-white text-center py-3">Contact US...</h2>
        <div class="row form">
            <div class="col-md-6">
                <div>
                <input class="form-control search-input contactinput" id="nameInput" oninput="nameValidation()" type="text" name="name" placeholder="Enter your Name">
                <div class="alert alert-warning my-1 d-none" id="nameError">Special Characters and Numbers not allowed</div>
                </div>
                <div>
                <input class="form-control search-input contactinput" id="phoneInput" oninput="phoneValidation()" type="text" name="phone" placeholder="Enter Phone">
                <div class="alert alert-warning my-1 d-none" id="phoneError">Please enter a valid Phone Number</div>
                </div>
                <div>
                <input class="form-control search-input contactinput" id="passInput" oninput="passValidation()" type="password" name="pass" placeholder="Enter Password">
                  <div class="alert alert-warning my-1 d-none" id="passwordError">
                    Please enter a valid password Minimum eight characters and at least one letter</div>    
                </div>            
            </div>

            <div class="col-md-6">
                <div>
                <input class="form-control search-input contactinput" id="mailInput" oninput="emailValidation()" type="email" name="mail" placeholder="Enter Email">
                <div class="alert alert-warning my-1 d-none" id="emailError">Please enter a valid email address</div>
                </div>
                <div>
                <input class="form-control search-input contactinput" id="ageInput" oninput="ageValidation()" type="number" name="age" placeholder="Enter Age">
                <div class="alert alert-warning my-1 d-none" id="ageError">Please enter a valid Age</div>
                </div>
                <div>
                <input class="form-control search-input contactinput" id="repassInput" oninput="repassValidation()" type="password" name="repass" placeholder="Enter Repassword">
                <div class="alert alert-warning my-1 d-none" id="repassError">ReEnter Password correct</div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
        <button id="submitBtn" class="btn btn-outline-danger my-3 text-center" type="submit" disabled> Submit</button>
        </div>
    </div>
`
};

$('.contactLink').click(function(){
  contact();
});

function regexSuccess(alertId,inputId){
  $(`#${alertId}`).addClass('d-none');
  $(`#${inputId}`).addClass('valid')
};

function regexFailed(alertId,inputId){
  $(`#${alertId}`).removeClass('d-none');
  $(`#${inputId}`).removeClass('valid')
};

let namevalid,mailvalid,phonevalid,agevalid,passvalid,repassvalid;

function nameValidation(){
  check()
  let nameRegex=/^[a-zA-Z]+$/
  if(nameRegex.test($('#nameInput').val())){
    regexSuccess('nameError','nameInput');
    namevalid=true;
  }else{
    regexFailed('nameError','nameInput');
    namevalid=false;
  }
}

function emailValidation(){
  check()
  let emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  if(emailRegex.test($('#mailInput').val())){
    regexSuccess('emailError','mailInput');
    mailvalid=true;
  }else{
    regexFailed('emailError','mailInput');
    mailvalid=false;
  }
}

function phoneValidation(){
  check()
  let phoneRegex=/^[0-9]{11}$/
  if(phoneRegex.test($('#phoneInput').val())){
    regexSuccess('phoneError','phoneInput');
    phonevalid=true;
  }else{
    regexFailed('phoneError','phoneInput');
    phonevalid=false;
  }
}

function ageValidation(){
  check()
  let ageRegex=/^[1-9][0-9]$/
  if(ageRegex.test($('#ageInput').val())){
    regexSuccess('ageError','ageInput');
    agevalid=true;
  }else{
    regexFailed('ageError','ageInput');
    agevalid=false;
  }
}
function passValidation(){
  check()
  let passRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  let thePass=$('#passInput')
  if(passRegex.test(thePass.val())){
    regexSuccess('passwordError','passInput');
    passvalid=true;
  }else{
    regexFailed('passwordError','passInput');
    passvalid=false;
  }
  return thePass.val();
}

function repassValidation(){
  let repassword=$('#repassInput')
  let firstPass= passValidation();
  if(repassword.val() == firstPass){
    regexSuccess('repassError','repassInput');
    repassvalid=true;
  }else{
    regexFailed('repassError','repassInput');
    repassvalid=false;
  }
  check();

};

function check(){
  if(namevalid==true && mailvalid==true && phonevalid==true && agevalid==true && passvalid==true && repassvalid==true){
    $('#submitBtn').removeAttr('disabled');
  }else{
    $('#submitBtn').attr('disabled','true');
  }
}



