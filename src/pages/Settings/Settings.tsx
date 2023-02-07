import { Page } from '@/interfaces/Page';
import { SettingsControls } from '@/features/Settings/components/SettingsControls/SettingsControls';

export const Settings = ({ title }: Page) => {
  return (
    <section className={`settings _page`}>
      <div className={`settings__inner _container`}>
        <h2 className={`settings__title _pageTitle`}>{title}</h2>
          <SettingsControls />
      </div>
    </section>
  )
}
