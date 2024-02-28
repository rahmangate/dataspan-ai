import { DataRecord } from "@/service/aws";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

//  state interface
export interface ItemListProps<T> {
  canFetch: boolean;
  data: T[];
}
interface State {
  trainData: ItemListProps<DataRecord>;
  validData: ItemListProps<DataRecord>;
  testData: ItemListProps<DataRecord>;

  setTrainData: (trainData: ItemListProps<DataRecord>) => void;
  setValidData: (validData: ItemListProps<DataRecord>) => void;
  setTestData: (textData: ItemListProps<DataRecord>) => void;

  refresh: () => void;
}

//  store
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      trainData: { canFetch: true, data: [] },
      setTrainData: (trainData: ItemListProps<DataRecord>) =>
        set({ trainData: trainData }),

      validData: { canFetch: true, data: [] },
      setValidData: (validData: ItemListProps<DataRecord>) =>
        set({ validData: validData }),

      testData: { canFetch: true, data: [] },
      setTestData: (testData: ItemListProps<DataRecord>) =>
        set({ testData: testData }),

      refresh: () => {
        // clear other states
        // useStore.getState().clear();
        // reset user and auth token
        set({
          trainData: { canFetch: true, data: [] },
          validData: { canFetch: true, data: [] },
          testData: { canFetch: true, data: [] },
        });
      },
    }),
    {
      name: "dai",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
