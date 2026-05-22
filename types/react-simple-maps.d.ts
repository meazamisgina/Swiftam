declare module "react-simple-maps" {
  import type { ReactNode, SVGProps, Ref } from "react";

  export type GeographyStyle = Record<string, unknown>;

  export interface GeographyRenderProps {
    rsmKey: string;
    svgPath: string;
    [key: string]: unknown;
  }

  export interface ComposableMapProps extends Omit<SVGProps<SVGSVGElement>, "width" | "height"> {
    width?: number;
    height?: number;
    projection?: string | ((...args: unknown[]) => unknown);
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number?];
      parallels?: [number, number];
    };
  }

  export const ComposableMap: (props: ComposableMapProps & { ref?: Ref<SVGSVGElement> }) => ReactNode;

  export interface GeographiesProps {
    geography: string | object;
    parseGeographies?: (features: unknown[]) => unknown[];
    children: (context: {
      geographies: GeographyRenderProps[];
      outline?: GeographyRenderProps;
      borders?: GeographyRenderProps;
      path: (input: unknown) => string | null | undefined;
    }) => ReactNode;
  }

  export const Geographies: (props: GeographiesProps) => ReactNode;

  export interface GeographyProps {
    geography: GeographyRenderProps;
    style?: { default?: GeographyStyle; hover?: GeographyStyle; pressed?: GeographyStyle };
  }

  export const Geography: (props: GeographyProps) => ReactNode;

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
  }

  export const Marker: (props: MarkerProps) => ReactNode;

  export function useMapContext(): {
    width: number;
    height: number;
    projection: (coordinates: [number, number]) => [number, number];
    path: (input: unknown) => string | null | undefined;
  };
}
