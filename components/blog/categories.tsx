type Category = {
  _id: string;
  title: string;
};

type CategoriesProps = {
  categories: Category[];
}

export function Categories({ categories }: CategoriesProps) {
  return categories.map((category) => (
    <span
      key={category._id}
      className="bg-secondary px-2 py-1 rounded-full font-semibold text-secondary-foreground text-xs"
    >
      {category.title}
    </span>
  ))
}