import AlbumList from '@features/Albums/components/AlbumList/AlbumList';
import { Page } from '@interfaces/Page';
import { albums } from '@services/mockDataService';
import { FC } from 'react';

const Albums: FC<Page> = ({ title }: Page): JSX.Element => {
  return (
    <section className={`albums _page`}>
      <div className={`albums__inner _container`}>
        <h2 className={`albums__pageTitle _pageTitle`}>{title}</h2>
        {albums.length > 0 ? <AlbumList albums={albums} /> : <p>Albums list is empty</p>}
      </div>
    </section>
  );
};

export default Albums;
