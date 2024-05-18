'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [
      {
        title: 'Creamy cajun chicken pasta',
        ingredients:
          '1 tbsp - olive oil, 1 - red onion, 200 g - mushrooms (sliced), 1 - red pepper, 500g - chicken breast (diced), 1 tbsp. - Cajun seasoning, 1 pinch - salt, 500 g - pasta, 500ml - chicken stock, 11 g - light cream cheese',
        kcal: '516 g',
        protein: '38 g',
        carbs: '71 g',
        fat: '8 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2021/04/creamy-pasta-recipe-card_1709820671.jpg?width=700',
        type: 'breakfast',
        time: '15 min',
        instructions:
          'First, heat the olive oil in a large non-stick pan. Add the red onion, mushrooms, and pepper strips and cook for a few minutes until softened. Add your chicken pieces, fry until completely cooked through and no longer pink, then add the veg back. Next add the pasta and chicken stock, cover the pan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Spicy Chicken With Couscous',
        ingredients:
          '1 tbsp. - curry paste, 1 tbsp. - mango chutney, 1/2 tsp. - turmeric, 50 ml - olive oil, 4 - chicken breast, 300 g - couscous, 350 ml - vegetable stock',
        kcal: '508 g',
        protein: '66 g',
        carbs: '39 g',
        fat: '20 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2019/12/Spicy-Chicken-ARTICLE_1577793747.jpg?width=700',
        type: 'lunch',
        time: '25 min',
        instructions:
          '1) Firstly, make a marinade for your chicken by adding the curry paste, chutney, turmeric, salt and olive oil to a bowl and mixing well. Сut each chicken breast in half and add to the marinade, stirring until well covered. Next, heat a grill pan over medium heat and lay out your chicken pieces.  Meanwhile, place the couscous in a big bowl and carefully pour in the boiling vegetable stock. Finally, divide your couscous into 4 containers, top with two pieces of marinated chicken and finish with a sprinkle of coriander.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Simple High-Protein Lasagne',
        ingredients:
          '500 g - lean beef mince, 1 - carrot, 1 - celery stalk, 1/2 - onion, 1 can - tomato sauce, 1 tbsp. - tomato paste, 300 g - cottage cheese, 30 g - parmesan, 1 tbsp. - Italian herbs, 1 tsp. - garlic powder, 1 tbsp. - salt, 6 - lasagne sheets, 70 g - mozarella',
        kcal: '447 g',
        protein: '55 g',
        carbs: '35 g',
        fat: '9 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/lasagne-700x385_1692623259.jpg?width=700',
        type: 'breakfast',
        time: '19 min',
        instructions:
          'Firstly, make a marinade for your chicken by adding the curry paste, chutney, turmeric, salt and olive oil to a bowl and mixing well. Сut each chicken breast in half and add to the marinade, stirring until well covered. Next, heat a grill pan over medium heat and lay out your chicken pieces.  Meanwhile, place the couscous in a big bowl and carefully pour in the boiling vegetable stock. Finally, divide your couscous into 4 containers, top with two pieces of marinated chicken and finish with a sprinkle of coriander.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chicken Curry Gyros',
        ingredients:
          '500 g - chicken thighs, 200 g - plain yoghurt, 1 tbsp. - curry powder, 1 tbsp. - sweet paprika, 1 tbsp. - garam masala, 1/2 - lemon',
        kcal: '541 g',
        protein: '40 g',
        carbs: '52 g',
        fat: '17 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2021/10/Chicken-Curry-Gyros-FEATURe_1633529350.jpg?width=700',
        type: 'lunch',
        time: '15 min',
        instructions:
          'Mix together the marinade ingredients until fully combined, then add your chicken thighs and coat. Add the green chilli, coriander, mint leaves, olive oil and a splash of water to a food processor. Add this mixture to a bowl with plain yoghurt, garlic, cumin, garam masala, and lemon juice and mix well to combine. Cook the chicken thighs. Heat a non-stick pan, add chicken thighs, and cook for around 5 minutes. Add peppers into the pan. Slice your chicken thighs into thin strips.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Zingy Chicken Burger',
        ingredients:
          '80 g - spicy tortilla chips, 1 tbsp. - chilli powder,1 tbsp. - garlic granules, 1 tsp. - paprika, 4 - chicken breasts, 1 - egg, 50 g - cornflourm, 4 - sesame seed burger buns',
        kcal: '564 g',
        protein: '56 g',
        carbs: '17 g',
        fat: '9 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2020/03/Zingy-Burger-FEATURE_1583851638.jpg?width=700',
        type: 'breakfast',
        time: '14 min',
        instructions:
          'Mix together the marinade ingredients until fully combined, then add your chicken thighs and coat. Add the green chilli, coriander, mint leaves, olive oil and a splash of water to a food processor. Add this mixture to a bowl with plain yoghurt, garlic, cumin, garam masala, and lemon juice and mix well to combine. Cook the chicken thighs. Heat a non-stick pan, add chicken thighs, and cook for around 5 minutes. Add peppers into the pan. Slice your chicken thighs into thin strips.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Easy Pesto Chicken',
        ingredients:
          '1 tbsp. - olive oil, 4 - chicken breast, 1/2 tbsp. - salt, 1/2 tsp. - pepper, 1 - red onion, 1 - courgette, 400 g - green beans, 100 g - reduced fat pesto',
        kcal: '523 g',
        protein: '52 g',
        carbs: '36 g',
        fat: '16 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2022/01/FEATURE-Pesto-Chicken-Veg_MP_KITCHENRECIPESQ4_SHOT5-min1_1642693034.jpg?width=700',
        type: 'lunch',
        time: '12 min',
        instructions:
          'Heat the olive oil in a large frying pan and then add the cubed chicken,  season with salt & pepper. Add the chopped veg, mix to combine, and then cook for a few minutes until the veg begins to soften. Stir through the reduced fat pesto so that everything is coated. Portion up into meal prep containers with cooked wholegrain quinoa if you want a serving of slow-releasing carbs too.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Air Fryer Chicken Skewers',
        ingredients:
          '1 tbsp -  siracha, 40 g - honey, 1/2 - lime, 2 tbsp- soy sauce, 1 pinch - salt, 2 - garlic cloves, 1 cm - piece of fresh ginger, 400 g - chicken, 1 - red onion',
        kcal: '356 g',
        protein: '35 g',
        carbs: '47 g',
        fat: '4 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/chicken-skewers-700x385_1695285798.jpg?width=700',
        type: 'breakfast',
        time: '10 min',
        instructions:
          'Combine the garlic, ginger, lime juice, honey, soy sauce, sriracha, and salt in a small bowl.Put the chopped chicken into a large bowl and pour in the marinade mixture. Chop the onion, assemble the skewers by threading each one with chicken cubes and onion alternately. Place in the air fryer and cook for 10 minutes at 180C.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Creamy Cajun Chicken Pasta',
        ingredients:
          '1 tbsp. - olive oil, 1 - red onion, 200 g - mushrooms, 1 - red pepper, 500 g - chicken breast, 1 tbsp. - Cajun seasoning, 1 pinch - salt, 500 g - pasta, 500 ml - chicken stock, 11 g - light cream cheese',
        kcal: '359 g',
        protein: '25 g',
        carbs: '43 g',
        fat: '19 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/cajun-pasta_1692787128.jpg?width=700',
        type: 'lunch',
        time: '15 min',
        instructions:
          'Combine the garlic, ginger, lime juice, honey, soy sauce, sriracha, and salt in a small bowl.Put the chopped chicken into a large bowl and pour in the marinade mixture. Chop the onion, assemble the skewers by threading each one with chicken cubes and onion alternately. Place in the air fryer and cook for 10 minutes at 180C.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Air-Fried Chicken Sandwich',
        ingredients:
          '130 g - chicken breast, 15 g - Protein Crispies, 2 tsp. - garlic powder, 2 tbsp. - onion powder, 2 tbsp. - paprika, 2 tbsp. - chilli powder, 2 tbsp. - cumin powder, 10 g - egg whites Dash hot sauce, 15 g - fat free Greek yoghurt, 5 g - fat free mayo',
        kcal: '400 g',
        protein: '46 g',
        carbs: '36 g',
        fat: '7 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/01/air-fryer-chicken-sandwich-hero_1673020367.jpg?width=700',
        type: 'breakfast',
        time: '18 min',
        instructions:
          'Grab your chicken breast and place it on a chopping board. Add the Protein Crispies to a zip lock bag and crush them up into smaller pieces using a rolling pin. Pour the Protein Crispies out into a small bowl along with garlic powder, onion powder, paprika, chilli powder, salt, and pepper. Add your egg whites, a couple of dashes of hot sauce, and all the spices, and then whisk to combine. Drop chicken breast into the wet mixture. Place the coated chicken breast in the air fryer for 12 mins on 200C. Once the chicken is cooked,  assemble your sandwich.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Harissa Chicken & Couscous',
        ingredients:
          '500 g - chicken thighs, 1 tbsp. - olive oil, 2 tbsp. - harissa paste, 1/2 - lemon, 1 - onion, 3 - garlic cloves, 2 tbsp. - coconut oil, 1 tsp. - cumin, 1 tsp. - smoked paprika, 350 g - couscous, 1 litre - boiled water, 1 bunch - fresh parsley, 1 tsp. - chilli flakes, 40 g - pine nuts',
        kcal: '579 g',
        protein: '29 g',
        carbs: '30 g',
        fat: '21 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2021/12/Harissa-Chicken-HERO_1640345749.jpeg?width=700',
        type: 'lunch',
        time: '15 min',
        instructions:
          'Add the olive oil, harissa paste, salt, pepper, and lemon juice to your chicken thighs and massage the paste into them. Chop the onion and garlic, then heat a tablespoon of coconut oil in a non-stick pan, add the onion and cook for 5 minutes until soft. Add the garlic to pan and cook for 2 minutes before adding the cumin and smoked paprika. Mix veg stock and boiling water together, then add to the pan. Heat the remaining tablespoon of coconut oil in a cast iron pan or griddle on high heat. Add the harissa chicken thighs and cook for 4-5 minutes on each side, before removing from pan and setting aside.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Buffalo Chicken Pasta Salad',
        ingredients:
          '160 g - cooked pasta, 3 - breasts cooked chicken, 2 stalks - celery, 5 - cherry tomatoes, 1 - yellow pepper, 2 tbsp. - reduced-fat ranch dressing, 175 ml - peri sauce, 1/2 tsp. - garlic powder, 4 tbsp. - reduced fat butter or margarine',
        kcal: '485 g',
        protein: '49 g',
        carbs: '30 g',
        fat: '20 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2019/06/Buffalo-chicken-1800x1200-minopt_blog_1573554985.jpg?width=700',
        type: 'breakfast',
        time: '13 min',
        instructions:
          'Place a saucepan over a medium heat and add the peri-peri sauce and garlic powder. Add butter and salt and cook for a further 5 minutes. Chop celery, tomatoes and pepper into bite-size pieces, and then shred the chicken using two forks, place into a large mixing bowl with the cooked pasta. Pour over buffalo sauce and toss it through the pasta salad.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Easy Pasta Salad Meal',
        ingredients:
          '200 g - cooked pasta, 2 cans - tuna, 1 tin - sweetcorn, 2 - carrots, 1 - yellow pepper, 4 tbsp. - olive oil, 1 - lemon, 1/2 tsp. - garlic powder',
        kcal: '415 g',
        protein: '26 g',
        carbs: '40 g',
        fat: '20 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/pasta-ss_1692709429.png?width=700',
        type: 'lunch',
        time: '9 min',
        instructions:
          'Make the dressing by adding the oil, lemon juice & zest, garlic powder, and salt & pepper to a small bowl and mixing well. Add your cooked pasta to a large bowl and then add the shredded carrot, sweetcorn, diced pepper, and drained tuna. Pour the dressing over the top and then use a large spoon to carefully mix everything together.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Asian Peanut Butter Chicken',
        ingredients:
          '5 tbsp. - Peanut Butter, 50ml - orange juice, 3 tbsp. - sugar free Syrup, 3 tbsp. - soy sauce, 1 thumb - ginger,1 - chicken breasts',
        kcal: '315 g',
        protein: '36 g',
        carbs: '41 g',
        fat: '15 g',
        url: 'https://static.thcdn.com/images/v2/wp-content/uploads/sites/478/2017/05/02175541/Peanut-butter-chicken-1800-1200.jpg?width=700',
        type: 'breakfast',
        time: '12 min',
        instructions:
          'Preheat the oven to 200°C or 180°C for fan-assisted. Whisk peanut butter, 100ml hot water and orange juice together until smooth then add the syrup, soy sauce and ginger. Season and sear the chicken breasts by frying on a high heat using a non-stick pan for 3 minutes on each side, then transfer to a casserole dish and thoroughly coat the chicken with the peanut butter sauce. Bake for 20 minutes.  Whilst waiting, make the salad dressing by whisking the syrup, soy, sesame oil and seeds together, then combine with the spiralised cucumber and carrots.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Malaysian Chicken Satay',
        ingredients:
          '2 tbsp. - sesame, peanut, 2 stalks - lemongrass, 1 - white onion, 2 - cloves garlic, 1 thumb - ginger, 2 - red chillies, 1 tsp. - turmeric, 1 tsp. - cumin seeds, 8 tbsp. - Powdered Peanut Butter, 3 - chicken breasts, 300g - rice (cooked), 1 - red onion, 1 - cucumber',
        kcal: '453 g',
        protein: '33 g',
        carbs: '46 g',
        fat: '15 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/malaysain-chicken-blog-edit-1_1692688515.jpg?width=700',
        type: 'lunch',
        time: '17 min',
        instructions:
          'Place the sesame oil, lemongrass, onion, garlic, ginger, chillies, turmeric and cumin into a blender. Process until you get a smooth paste. Mix powdered peanut Butter with 8 tbsp. Combine half of the spice paste with the peanut butter to make a peanut sauce, and pour the remaining spice paste over your diced chicken. Fry the chicken skewers on a medium to high heat for 8-10 minutes or until completely cooked through. Once cooked, remove from the pan and set aside. Add the peanut sauce to the same pan and bring to the boil, stirring occasionally until piping hot. Remove from the heat.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chicken Tikka Masala',
        ingredients:
          '2 tbsp. - coconut oil, peanut, 2 stalks - lemongrass, 1 - white onion, 2 - cloves garlic, 1 thumb - ginger, 2 - red chillies, 1 tsp. - turmeric, 1 tsp. - cumin seeds, 8 tbsp. - Powdered Peanut Butter, 3 - chicken breasts, 300g - rice (cooked), 1 - red onion, 1 - cucumber',
        kcal: '586 g',
        protein: '49 g',
        carbs: '69 g',
        fat: '14 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2020/09/chickentikkamealprep-FEATURE_1600761714.jpg?width=700',
        type: 'breackfast',
        time: '17 min',
        instructions:
          'Heat the coconut oil in a pan over a medium heat and add the chicken breast and onion. Add the garlic, ginger, tomato paste, turmeric, garam masala, and chilli powder. Add the blended tomatoes and chicken stock, bring your pan to simmer. Once your sauce has reduced by roughly half, take off the heat and stir through the Greek yoghurt.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Creamy Garlic Chicken',
        ingredients:
          '1 tbsp. - olive oil, 500 g - chicken breast, 300 g - brown rice, 2 tbsp. - mixed herbs, 3 - garlic cloves, 1 - lemon, 750 ml - chicken stock, 200 g - green beans, 200 g - low fat Greek yoghurt, 250 g - spinach',
        kcal: '576 g',
        protein: '39 g',
        carbs: '67 g',
        fat: '123 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/garlic-chicken-rice-ss_1692710599.png?width=700',
        type: 'lunch',
        time: '16 min',
        instructions:
          'Heat the oil in a large pan and then add the chicken pieces. Add the brown rice (uncooked), mixed herbs, garlic cloves, and lemon zest, stirring well to combine. Season with salt and pepper to taste. Pour in the chicken stock, mix well. Add the green beans to the pan, cover again. Stir through the yoghurt and add the spinach.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'BBQ Pulled Chicken Mac',
        ingredients:
          '4 tbsp. - sugar free Sauce, 1 tsp. - paprika, 1 tsp. - garlic granules, 300g - chicken breast, 3 tbsp. - butter, 3 tbsp. - plain flour, 1 - garlic clove, 1 pint - semi skimmed milk, 150g - low fat cheddar',
        kcal: '397 g',
        protein: '21 g',
        carbs: '34 g',
        fat: '25 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2020/10/mac-and-cheese_1602242057.jpg?width=700',
        type: 'breakfast',
        time: '9 min',
        instructions:
          'Preheat the oven to 180°C/350°F and boil a large saucepan of water. Mix BBQ Sugar-Free Sauce, paprika, garlic granules, salt, and pepper in a small bowl. Slice deep cuts sideways into each chicken breast and transfer them to a baking tray, pour the BBQ sauce mixture onto the chicken breasts. Rub the sauce into the chicken breast.Baked, then remove the chicken from the foil – set the BBQ juices aside. Add the BBQ juices and shredded chicken to a pan fry over medium heat for 3-4 minutes, then set aside. Put your macaroni pasta on to cook.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Peanut Butter Chicken Curry',
        ingredients:
          '1 tbsp. - coconut Oil, 400 g - chicken breast, 1 - onion, 2 - garlic cloves, 1 thumb - ginger, 1 - red chilli, 5 tbsp. - curry powder, 1 tin - chopped tomatoes, 1 - coriander,400ml - light coconut milk',
        kcal: '417 g',
        protein: '24 g',
        carbs: '24 g',
        fat: '33 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2020/08/Peanut-Butter-Curry-FEATURE-min_1596795320.jpg?width=700',
        type: 'lunch',
        time: '15 min',
        instructions:
          'Heat the coconut oil in a large pan and add the chicken. Season lightly and fry until cooked through and golden brown on the outside, then set aside. Add the onion and fry until soft. Add the chopped garlic, ginger, and chilli and fry for another 1-2 minutes. Add the chopped tomatoes and coriander, give it a good stir and leave to simmer for another 10 minutes, stirring occasionally. Stir in the light coconut milk to the sauce and then add your crunchy peanut butter. Give it all really good stir, and leave to simmer on a low heat until your curry has reached your desired consistency.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Fajita Pasta Bake',
        ingredients:
          '1 tbsp. - coconut oil, 350 g - chicken thigh, 1 - onion, 2 - bell peppers, 1/2 pack - fajita seasoning, 350g - rigatoni, 100 g - salsa dip, 100 g - light cream cheese, 50 g - light cheddar, 30 g - light mozzarella',
        kcal: '349 g',
        protein: '26 g',
        carbs: '24 g',
        fat: '13 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2020/07/Fajita-Pasta-Bake-FEATURE-min_1594109377.jpg?width=700',
        type: 'breakfast',
        time: '15 min',
        instructions:
          'Preheat the oven to 180°C/ 360°C. Heat the coconut oil in a large pan and add your chicken thighs. Add the onion and peppers to the pan and fry until soft, stirring regularly. Add the fajita seasoning and the cooked chicken back in, stir well and fry for 5 minutes. Add your cooked pasta (make sure to drain it before), the salsa, and the cream cheese and mix thoroughly so everything is evenly combined. Add your chopped coriander and stir well before transferring to a large baking dish. Top with your cheese and bake for 10-15 minutes until it starts to turn crispy.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Lemon & Thyme Chicken',
        ingredients:
          '2 tsp. - fresh thyme, 2 tsp. - mixed herbs, 6 - boneless, skinless chicken thighs, 1 tbsp. - oil, 1 - onion, 2 - garlic cloves, 1 - lemon, 100 ml - chicken stock, 200 ml - crème fraiche, 2 pinch - thyme',
        kcal: '481 g',
        protein: '46 g',
        carbs: '14 g',
        fat: '43 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2021/08/0423-STDCRE-12981-MYP-NF-Kitchen-Recipe-Shoot-Q2-lemon-thyme-chicken-1-1200x672-min_1627893961.jpg?width=700',
        type: 'lunch',
        time: '20 min',
        instructions:
          'Prepare the seasoning by mixing the fresh thyme, mixed herbs, salt, and pepper in a little bowl. Add the oil to a large pan over a medium heat, add your chicken thighs and cook for several minutes on each side. Add the onion and garlic and cook for a few minutes until softened. Add the lemon juice, chicken stock, and any of the remaining seasoning mix. Add the crème fraiche, stir through, and cook for another 2-3 minutes to thicken.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chicken & Chorizo Paella',
        ingredients:
          '100 g - chorizo, 500 g - skinless chicken thighs, 1 pepper, 1 - brown onion, 1tsp. - turmeric, 1tsp. - paprika, 2 - garlic cloves, 1 - red bell pepper, 225 g - paella rice, 400 ml. - chicken stock, 4 - tomatoes, 100 g. - frozen peas, 1 - lemon',
        kcal: '256 g',
        protein: '37 g',
        carbs: '39 g',
        fat: '31 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2021/08/0806-STDCRE-19499-CC-MYP-Kitchen-Recipes-Shot-5-1200x672-min_1629980284.jpg?width=700',
        type: 'breakfast',
        time: '13 min',
        instructions:
          'Cook the diced chorizo for a few minutes until it begins to brown and release its oils. Add the chicken thighs to the same pan and cook in the chorizo oil. Season with salt and pepper and cook until browned on each side and no pink remains. Remove from the pan and set aside. Add the chopped onion and fry for a few minutes until softened. Add the paella rice and stir through. Pour in the chicken stock and chopped tomatoes and mix everything until evenly combined. Add the chorizo pieces back into the pan and stir through. Add the peas, stir through, and allow to warm for a few final minutes before taking off the heat.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Seared Tuna Steak',
        ingredients:
          '150 g - tuna steaks, 1 tsp. - coarse sea salt, 1 tbsp. - coconut oil, 2 tbsp. - pink peppercorns, 4 - large sweet potatoes, 1 tbsp. - plain flour, 1/2 tsp. - pepper',
        kcal: '250 g',
        protein: '17 g',
        carbs: '29 g',
        fat: '11 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2018/01/FEATURE-TUNA_1580308346.jpg?width=700',
        type: 'lunch',
        time: '13 min',
        instructions:
          'Preheat your oven to 200°C, prepare the sweet potatoes. Scrub clean each potato and prick all over with a fork. Cut the sweet potatoes into wedges, sprinkle the flour, salt, pepper and melted coconut oil over the wedges and shake them. Fry the tuna steaks on each side for a 1-2 minutes if you prefer seared tuna, or 3-4 minutes on each side if you prefer it cooked through.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Quick Spicy Cajun Salmon',
        ingredients:
          '3 - cloves garlic, 1 - lemon, 1 - wild salmon fillets, 1 tbsp. - cajun seasoning, 1 tbsp. - olive oil, 1 tsp. coarse sea salt and black pepper, 180 g - couscous, 5 stems - tender stem broccoli',
        kcal: '220 g',
        protein: '19 g',
        carbs: '29 g',
        fat: '10 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/cajun-salmon-ss_1692711335.png?width=700',
        type: 'breakfast',
        time: '20 min',
        instructions:
          'Preheat oven to 160°C. Chop the dry ends of the tender stem broccoli off and spiralise the courgette, lay the broccoli out into a deep baking tray, then layer with the courgette, garlic, and lemon and season with sea salt and black pepper. Rub the salmon fillets on all sides with olive oil and the cajun seasoning, then place them on top on the vegetables, skin-side up. Bake for 10 minutes.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Salmon Poke Bowl',
        ingredients:
          '3 tbsp. - light mayonnaise, 1 tbsp. - sriracha, 2 tbsp. - soy sauce, 2 tbsp. - mirin, 1 tbsp. - toasted sesame oil, 1 tbsp. - honey, 300 g - sashimi grade salmon, 1 - carrot, 1 - cucumber, 1 - spring onions, 1 - avocado.',
        kcal: '233 g',
        protein: '22 g',
        carbs: '25 g',
        fat: '14 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2021/11/SALMON-POKE-BOWL-FEATURE_1638176988_1200x672_acf_cropped.jpg?width=700',
        type: 'lunch',
        time: '16 min',
        instructions:
          'Mix together the light mayonnaise, sriracha, soy sauce, mirin, sesame oil, and honey to make a smooth marinade. Reserve 1/2 the marinade to use as a dressing later, then add sashimi salmon to remaining marinade. Rinse sushi rice thoroughly until the water runs clean, cook sushi rice according to packet instructions. Chop your cucumber into quarters, thinly slice the spring onions lengthways, and julienne carrots using a peeler. Heat the coconut oil in a non-stick pan and add sliced shallots. Gently sauté the shallots on low heat for approximately 7 minutes. Build your poke bowl.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'High-Protein Kedgeree',
        ingredients:
          '1 - fillets smoked haddock, 1 tsp. - coconut oil, 1 - white onion, 1 tsp. - turmeric, 1tsp. - ground coriander, 1 tsp. - curry powder, 2 - hard boiled eggs, 500 g - cooked wholegrain rice.',
        kcal: '268 g',
        protein: '34 g',
        carbs: '35 g',
        fat: '13 g',
        url: 'https://static.thcdn.com/images/v2/wp-content/uploads/sites/478/2018/01/22134234/kedgeree-1800-1200-min.jpg?width=700',
        type: 'breakfast',
        time: '13 min',
        instructions:
          'Place the smoked haddock into a large frying pan over a medium heat, cover with an inch of water, dring to the boil then turn the heat down and simmer for 5 minutes. Pour the water out of the pan and add the coconut oil. Add the chopped onion and simmer over a medium to low heat for 5 minutes until golden. Add the turmeric, ground coriander and curry powder and cook for a further 30 seconds, stirring occasionally. Add the cooked rice and haddock and stir. Heat through, then add the boiled eggs and stir again.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Sweet Chilli Glazed Salmon',
        ingredients:
          '1 - salmon fillets, 1 tsp. - fresh ginger, 1 - garlic clove, 1 tbsp. - soy sauce, 2 tbsp. - oyster sauce, 2 tbsp. - sweet chilli sauce',
        kcal: '262 g',
        protein: '30 g',
        carbs: '30 g',
        fat: '11 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/teriyaki-salmon-700x385_1695286095.jpg?width=700',
        type: 'lunch',
        time: '18 min',
        instructions:
          'Combining the fresh ginger, garlic, soy sauce, oyster sauce, and sweet chilli into a bowl and stirring well to combine. Add the salmon fillets to the marinade and turn them over and over to coat fully. Preheat your grill to 200°C. Place the salmon fillets on a lined baking tray and pour any excess marinade on top of them. Grill for 7-10 minutes until the top of the salmon is glazed and caramelised.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Spiced Lamb With Bulgur',
        ingredients:
          '1 tbsp. - oil, 1 - red onion, 1 tbsp. - ras el hanout, 3 tbsp. - tomato puree, 250 g - lamb mince, 125 ml - boiling water, 130 g - bulgur wheat, 100 g - feta, 1/2 cucumber',
        kcal: '562 g',
        protein: '49 g',
        carbs: '45 g',
        fat: '45 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2021/07/0423-STDCRE-12981-MYP-NF-Kitchen-Recipe-Shoot-Q2-lamb-bulgher-wheat-1-1200x672-min_1625756123.jpg?width=700',
        type: 'breakfast',
        time: '22 min',
        instructions:
          'Heat the oil in a large frying pan and cook the onion for a few minutes until softened. Add the ras el hanout and tomato puree and stir until everything is evenly coated. Add the lamb mince and break up into pieces, stirring to combine with everything else. Add the boiling water and leave to simmer for a further 5 minutes so that the liquid reduces and the sauce thickens. Add the bulgur wheat to a pan of boiling water and cook as per the pack instructions. Build a bed of feta bulgur on a plate and add a few spoonfuls of the lamb mixture on top.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Creamy Sausage Pasta',
        ingredients:
          '1 tsp - coconut oil, 1 - leek, 2 clove - garlics, 8 - reduced fat sausages, 200 g - quark, 1 tin - chopped tomatoes, 240 g - wholemeal penne pasta, 1 tsp - dried chilli flakes, 1 handful - fresh basil leaves',
        kcal: '582 g',
        protein: '48 g',
        carbs: '45 g',
        fat: '48 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2019/06/sausage-pasta-2-1800x12001-minopt_blog_1573554828.jpg?width=700',
        type: 'lunch',
        time: '20 min',
        instructions:
          'Add the coconut oil to a large, non-stick pan on a medium to high heat. Add the sliced leek into the pan and fry for 3-4 minutes, stirring occasionally. Add the garlic and pan fry for a further 2 minutes, then add the sliced sausages and fry for 6-10 minutes, stirring occasionally, until they are brown on all sides. Add the chilli flakes and season with salt and pepper to taste. Tin of tomatoes and stir to combine. Add the cooked pasta to the pan and mix in with the sauce so that it’s all combined',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Sweet Potato & Chorizo',
        ingredients:
          '100 g - sweet potatoes, 1 tbsp. - coconut oil, 1/2 - red onion, 200 g - tinned chickpeas, 150 g - chorizo , 2 - medium eggs',
        kcal: '481 g',
        protein: '37 g',
        carbs: '26 g',
        fat: '22 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2019/06/sweet-potato-hash-1800x1200-minopt_blog_1573554517.jpg?width=700',
        type: 'breakfast',
        time: '15 min',
        instructions:
          'Peel the sweet potatoes and chop into 2cm cubes, put the cubes into a pan and cover with water, then bring to the boil. Add the coconut oil to a pan on a medium to high heat, once melted, add the chopped onions and chorizo/pancetta, and fry. Turn the heat down to medium and add the sweet potatoes, chickpeas, sea salt and black pepper. Squash them down a little and fry for 8-10 minutes without moving them, until the bottom becomes crispy.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Low-Carb Teriyaki Beef',
        ingredients:
          '75 ml - soy sauce, 120 ml - water, 1 tbsp. - cornstarch, 2 tbsp. - maple syrup, 1 tsp. - coconut oil, 1 - rump steaks, 2 - courgettes, 1 - yellow peppers, 55 g - edamame beans',
        kcal: '381 g',
        protein: '35 g',
        carbs: '25 g',
        fat: '21 g',
        url: 'https://static.thcdn.com/images/v2/app/uploads/sites/478/2023/08/beef-zoodles-ss_1692712105.png?width=700',
        type: 'lunch',
        time: '18 min',
        instructions:
          ' Whisk soy, water and cornstarch/guar gum in a saucepan and heat gently for 5-6 minutes until the sauce has thickened. Add the garlic and ginger at this point if you’re using it. Once thickened, whisk in the maple syrup and remove from the heat. Set aside. Heat a large wok on high. Add the coconut oil and steak slices and sauté for 1-2 minutes. Add the spiralised courgette and chopped pepper and stir-fry for a further 5-8 minutes.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Recipes', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  },
};
