This solution first displays index page.
Next page displays categories using REST request: https://davids-restaurant.herokuapp.com/categories.json
On clicking any category, all items under that category are listed using REST request:
https://davids-restaurant.herokuapp.com/menu_items.json?category={categoryId}