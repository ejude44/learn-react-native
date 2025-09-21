import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import { useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';
import { useFavoriteMealContext } from '../store/context/favorites-contexts';
//import { useSelector } from 'react-redux';
//import { FavoritesState } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }: any) {
  const { mealId } = route.params;
  const mealDetails = MEALS.find((meal) => meal.id === mealId);
  const { ids, addFavorite, removeFavorite } = useFavoriteMealContext();
  //const faveMealsIds = useSelector((state: FavoritesState) => state.ids);

  const mealIsFavorite = ids.includes(mealId);

  function headerButtonPressHandler() {
    if (mealIsFavorite) {
      removeFavorite(mealId);
    } else {
      addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: mealDetails?.title,
      headerRight: () => {
        return (
          <IconButton
            color={'white'}
            onPress={headerButtonPressHandler}
            count={ids.length}
            icon={mealIsFavorite ? 'star' : 'star-outline'}
          />
        );
      },
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: mealDetails?.imageUrl }} />
      <Text style={styles.title}>{mealDetails?.title}</Text>

      <MealDetails
        duration={mealDetails?.duration ?? 0}
        affordability={mealDetails?.affordability ?? ''}
        complexity={mealDetails?.complexity ?? ''}
        textStyle={{ color: 'white' }}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle subTitle={'Ingredients'} />
          <List list={mealDetails?.ingredients ?? []} />
          <Subtitle subTitle={'Steps'} />
          <List list={mealDetails?.steps ?? []} />
        </View>
      </View>
    </ScrollView>
  );
}
export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  listContainer: {
    width: '80%',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    margin: 8,
    color: 'white',
  },
});
