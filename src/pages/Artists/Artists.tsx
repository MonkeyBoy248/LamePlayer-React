import ArtistList from "@features/Artists/components/ArtistList/ArtistList";
import { Page } from "@interfaces/Page";
import { artists } from "@services/mockDataService";

const Artists = ({ title }: Page) => {
  return (
    <section className={`artists _page`}>
      <div className={`artists__inner _container`}>
        <h2 className={`artists__pageTitle _pageTitle`}>{title}</h2>
        { artists.length > 0 ?
        <ArtistList artists={artists} /> :
        <p>List of artists is empty</p>
        }
      </div>
    </section>
  )
}

export default Artists;