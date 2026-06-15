import type { Schema, Struct } from '@strapi/strapi';

export interface HomeHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_slides';
  info: {
    displayName: 'Hero Slide';
    icon: 'picture';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface HomeMantraCard extends Struct.ComponentSchema {
  collectionName: 'components_home_mantra_cards';
  info: {
    displayName: 'Mantra Card';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeServiceSlide extends Struct.ComponentSchema {
  collectionName: 'components_home_service_slides';
  info: {
    displayName: 'Service Slide';
    icon: 'images';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeStat extends Struct.ComponentSchema {
  collectionName: 'components_home_stats';
  info: {
    displayName: 'Stat';
    icon: 'chart-bubble';
  };
  attributes: {
    label: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String;
    style: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    url: Schema.Attribute.String;
  };
}

export interface SharedOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_shared_opening_hours';
  info: {
    displayName: 'Opening Hours';
    icon: 'clock';
  };
  attributes: {
    daysLabel: Schema.Attribute.String;
    hours: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.hero-slide': HomeHeroSlide;
      'home.mantra-card': HomeMantraCard;
      'home.service-slide': HomeServiceSlide;
      'home.stat': HomeStat;
      'shared.cta': SharedCta;
      'shared.opening-hours': SharedOpeningHours;
    }
  }
}
