import React, { useEffect, useState } from 'react';
import { BasicLoader, Box, ImageWithFallback } from '~components';
import { ScrollView, StyleSheet } from 'react-native';
import { ENTITY_HEIGHT, ENTITY_WIDTH } from '~config/constants';
import { Screen } from '~components/layout/Screen';
import { StackNavigationProps } from '~navigation/navigation.interface';
import { MainRoutes } from '~navigation/Main/mainTypes';
import { useEntity } from '~api/entity/useEntity';
import { IEntity } from '~interfaces/entity.interface';
import ErrorEmpty from '~components/molecules/ErrorEmpty';
import EntityHeader from '~screens/Entity/components/EntityHeader';
import EntitySheetDetails from '~screens/Entity/components/EntitySheetDetails';

const EntityScreen = ({ route }: StackNavigationProps<MainRoutes, 'Entity'>) => {
  const id = route.params.id;
  const [entity, setEntity] = useState<IEntity | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { data, isLoading, isError } = useEntity(id);

  useEffect(() => {
    setEntity(data?.entity || null);
  }, [data]);

  useEffect(() => {
    if (isError) {
      const errorMsg = 'Error while making the request';
      setErrorMessage(errorMsg);
    }
  }, [entity, isError]);

  if (isLoading) {
    return <BasicLoader />;
  }

  return (
    <Screen full>
      {errorMessage?.length > 0 ? (
        <Box flex={1} marginTop="xl">
          <ErrorEmpty subtitle={errorMessage} />
        </Box>
      ) : (
        entity && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentInset={{ bottom: 40 }}
            contentContainerStyle={styles.scrollView}>
            <Box style={styles.container}>
              <EntityHeader />
              <ImageWithFallback source={{ uri: entity.image }} styles={styles.image} />
              <EntitySheetDetails entity={entity} />
            </Box>
          </ScrollView>
        )
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ENTITY_WIDTH,
    height: ENTITY_HEIGHT,
  },
});

export default EntityScreen;
