import os
import math
import numpy
import pandas
import matplotlib
import matplotlib.pyplot as plt
import base64
matplotlib.use('Agg')


class Analyze:
    def __init__(self, json_data):

        self.races = ["native_indian", "asian", "black", "hispanic", "white", "other"]
        self.genders = ["female", "male", "other"]
        self.outcomes = ["success", "fail", "fatal"]
        self.diseases = ["stroke", "cancers", "diabetes"]
        self.features = ["total_record", "total_same_race", "total_different_race", "total_same_gender",
                         "total_different_gender"]

        for outcome in self.outcomes:
            self.features.append("total_" + outcome)
            self.features.append("same_race_" + outcome)
            self.features.append("different_race_" + outcome)
            self.features.append("same_gender_" + outcome)
            self.features.append("different_gender_" + outcome)

        for race in self.races:
            self.features.append("total_" + race)
            for outcome in self.outcomes:
                self.features.append(race + "_" + outcome)

        for gender in self.genders:
            self.features.append("total_" + gender)
            for outcome in self.outcomes:
                self.features.append(gender + "_" + outcome)

        for disease in self.diseases:
            self.features.append("total_" + disease)
            for outcome in self.outcomes:
                self.features.append(disease + "_" + outcome)

        doctors = {}
        i = 0

        while i < len(json_data):
            record = json_data[i]

            if record["doctor_id"] in doctors:
                doctors[record["doctor_id"]]["total_record"] += 1

                doctors[record["doctor_id"]]["total_" + record["patient_race"]] += 1
                doctors[record["doctor_id"]]["total_" + record["patient_gender"]] += 1
                doctors[record["doctor_id"]]["total_" + record["patient_disease"]] += 1

                doctors[record["doctor_id"]]["total_" + record["outcome"]] += 1
                doctors[record["doctor_id"]][record["patient_race"] + "_" + record["outcome"]] += 1
                doctors[record["doctor_id"]][record["patient_gender"] + "_" + record["outcome"]] += 1
                doctors[record["doctor_id"]][record["patient_disease"] + "_" + record["outcome"]] += 1

                if record["doctor_race"] == record["patient_race"]:
                    doctors[record["doctor_id"]]["total_same_race"] += 1
                    doctors[record["doctor_id"]]["same_race_" + record["outcome"]] += 1
                else:
                    doctors[record["doctor_id"]]["total_different_race"] += 1
                    doctors[record["doctor_id"]]["different_race_" + record["outcome"]] += 1

                if record["doctor_gender"] == record["patient_gender"]:
                    doctors[record["doctor_id"]]["total_same_gender"] += 1
                    doctors[record["doctor_id"]]["same_gender_" + record["outcome"]] += 1
                else:
                    doctors[record["doctor_id"]]["total_different_gender"] += 1
                    doctors[record["doctor_id"]]["different_gender_" + record["outcome"]] += 1

                i += 1

            else:
                doctors[record["doctor_id"]] = {}
                for feature in self.features:
                    doctors[record["doctor_id"]][feature] = 0

        data = {
            "doctor_id": []
        }

        for feature in self.features:
            data[feature] = []

        for doctor_id in doctors:

            data["doctor_id"].append(doctor_id)

            for key in doctors[doctor_id]:
                data[key].append(doctors[doctor_id][key])

        self.dataframe = pandas.DataFrame(data=data)
        self.stats_keys = []
        self.outcomes_keys = []

        outcomes_pairs = []
        for outcome in self.outcomes:
            outcomes_pairs.append("overall")
            self.dataframe[outcome + '_rate'] = self.dataframe['total_' + outcome] / self.dataframe['total_record']
            self.stats_keys.append(outcome + '_rate')
            outcomes_pairs.append(outcome + '_rate')
        self.outcomes_keys.append(outcomes_pairs)

        for item in ['same_race', 'different_race', 'same_gender', 'different_gender']:
            self.calculate_outcome_rates(item)

        for disease in self.diseases:
            self.calculate_outcome_rates(disease)

        for race in self.races:
            self.calculate_outcome_rates(race)

        for gender in self.genders:
            self.calculate_outcome_rates(gender)

        self.dataframe = self.dataframe.fillna(0)

    def all(self):
        result = {}

        i = 0
        length = len(self.outcomes_keys)
        while i < length:
            outcomes_pairs = self.outcomes_keys[i]
            fig, ax = plt.subplots()
            ax.scatter(self.dataframe[outcomes_pairs[1]], self.dataframe[outcomes_pairs[3]])
            ax.set_title(outcomes_pairs[0])
            ax.set_xlabel(outcomes_pairs[1].replace('_', ' '))
            ax.set_ylabel(outcomes_pairs[3].replace('_', ' '))
            ax.set_ylim(bottom=-0.1, top=1.1)
            ax.set_xlim(left=-0.1, right=1.1)
            name = 'fig.png'
            plt.savefig(name)
            plt.close(fig)
            with open(name, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                result[outcomes_pairs[0]] = encoded_string
            os.remove(name)
            i += 1
        return result

    def calculate_outcome_rates(self, item):
        outcomes_pairs = []
        outcomes_pairs.append(item)
        for outcome in self.outcomes:
            name = item + '_' + outcome + '_rate'
            self.dataframe[name] = self.dataframe[item + '_' + outcome] / self.dataframe['total_' + item]
            self.stats_keys.append(name)
            outcomes_pairs.append(name)
        self.outcomes_keys.append(outcomes_pairs)

    def bar_graph(self, current, plt, items, name):
        width = 0.1
        x = numpy.arange(len(self.outcomes))
        y = []

        for item in items:
            array = []
            for outcome in self.outcomes:
                array.append(current[item + '_' + outcome + '_rate'].mean())
            y.append(array)

        colors = ['red', 'cyan', 'orange', 'green', 'yellow', 'blue']

        fig, ax = plt.subplots()
        x_width = []

        for i in range(0, len(y) // 2):
            x_width.append(width * i * -1)
        x_width.reverse()
        for i in range(len(y) // 2, len(y)):
            x_width.append(width * (i - len(y) // 2 + 1))

        for i in range(len(y)):
            ax.bar(x + x_width[i], y[i], width, color=colors[i])

        ax.set_title(name.upper())
        ax.set_xticks(x, self.outcomes)
        ax.set_ylabel("Percentage")
        ax.set_ylim(bottom=0, top=1)
        name = 'fig.png'
        plt.legend(items)
        plt.savefig(name)
        plt.close(fig)
        encoded_string = ''
        with open(name, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        os.remove(name)

        return encoded_string

    def doctor_stats(self, doctor_id):
        good = []
        bad = []

        current = self.dataframe.loc[self.dataframe['doctor_id'] == doctor_id]

        for key in self.stats_keys:
            mean = self.dataframe[key].mean()
            std = self.dataframe[key].std()

            if math.ceil(current[key].mean()*100)/100 == 0:
                continue

            if 'success' in key:
                if current[key].mean() < mean - std:
                    bad.append(key.replace('_', ' '))
                elif current[key].mean() > mean + std:
                    good.append(key.replace('_', ' '))

            if 'fail' in key or 'fatal' in key:
                if current[key].mean() < mean - std:
                    good.append(key.replace('_', ' '))
                elif current[key].mean() > mean + std:
                    bad.append(key.replace('_', ' '))
        graphs = []

        for items, name in [(self.races, "races"), (self.genders, "genders"), (self.diseases, "diseases")]:
            encoded_string = self.bar_graph(current, plt, items, name)
            graphs.append(encoded_string)

        return {
            'good': good,
            'bad': bad,
            'graphs': graphs
        }
