import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import RefreshableListView from 'react-native-refreshable-listview';

interface Item {
  id: string;
  name: string;
}

interface ListWithRefreshProps {
  items: JobEntity[];
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
}

class ListWithRefresh extends Component<ListWithRefreshProps> {
  renderItem = ({ item }: { item: Item }) => (
    <View style={{ padding: 16 }}>
      <Text>{item.name}</Text>
    </View>
  );

  render() {
    const { items, refreshing, onRefresh, onLoadMore } = this.props;

    return (
      <RefreshableListView
        dataArray={items}
        renderRow={this.renderItem}
        refreshableMode="advanced"
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        refreshableComponent={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        loadMoreAtTop={false}
      />
    );
  }
}

export default ListWithRefresh;
