import { CATEGORIES } from '../data/dummy-data';
import { FlatList, ListRenderItemInfo } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import Category from '../models/category';

function CategoriesScreen({ navigation }: any) {
  function renderCategoryItem(itemData: ListRenderItemInfo<Category>) {
    function onPressHandler() {
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={onPressHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={(itemData) => renderCategoryItem(itemData)}
      keyExtractor={(item) => item.id}
    />
  );
}
export default CategoriesScreen;
