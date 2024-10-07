export type formField = {
  name: string;
  label?: string;
  controller: React.ComponentType<any>;
  controllerAttrs?: {
    placeholder?: string;
    className?: string;
  };
  description?: string;
};
