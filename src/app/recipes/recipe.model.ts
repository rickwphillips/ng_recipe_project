import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}

}


export const RECIPES_MOCKDATA: Recipe[] = [
  new Recipe(1, 'Pumpkin Pie',
    'A delicious and creamy spiced pumpkin pie',
    'https://media.istockphoto.com/id/850337100/photo/pumpkin-pie-on-rustic-background.jpg?s=612x612&w=0&k=20&c=eYCyhqw2hjPxauPnSL0rhXQx4CYiJVBMcpz6fHQDXN0=',
    [
      new Ingredient('Pie Crust', 1, 'Whole'),
      new Ingredient('Pumpkin Filling', 1, 'Can'),
      new Ingredient('Cool Whip', 16, 'Ounce'),
      new Ingredient('Brown Sugar', 2, 'Tea Spoon'),
      new Ingredient('Cinnamon', 1, 'Table Spoon')
    ]
  ),
  new Recipe(2, 'Spicy Quarter Pound Burger',
    'A delicious and spicy all American burger',
    'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
    [
      new Ingredient('Bun', 1, 'Whole'),
      new Ingredient('Ground Beef', 1, 'Patty'),
      new Ingredient('Lettuce', 1, 'Slice'),
      new Ingredient('Tomato', 2, 'Slice'),
      new Ingredient('Cheese', 1, 'Slice')
    ]
  ),
  new Recipe(3, 'Happy Sauce',
    'A delicious and unapologetically happy sauce',
    'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429629869293/d8e257bb-a76d-49e7-989a-39e07196a915-2060x1236.jpeg?width=620&quality=85&dpr=1&s=none',
    [
      new Ingredient('Happy', 1, 'Pound'),
      new Ingredient('Sauce', 3, 'Gallons')
    ]
  ),
];