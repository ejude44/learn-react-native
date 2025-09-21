import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFavoriteMealContext } from '../store/context/favorites-contexts';
import { MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

function FavoritesScreen() {
  const { ids } = useFavoriteMealContext();

  const favoriteMeals = MEALS.filter((meal) => ids.includes(meal.id));

  return (
    <View style={styles.container}>
      {ids.length === 0 ? (
        <View style={styles.textContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
            No favorite Meals yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMeals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MealItem
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              duration={item.duration}
              complexity={item.complexity}
              affordability={item.affordability}
            />
          )}
        />
      )}
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
