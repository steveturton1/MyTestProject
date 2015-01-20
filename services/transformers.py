__author__ = 'Steve'


class BaseTransformer(object):

    def to_json(self, obj):
        pass

    def to_json_list(self, list):
        mylist = []
        for el in list:
            mylist.append(self.to_json(el))
        return mylist


class GarmentTransformer(BaseTransformer):
    def to_json(self, garment):
        if isinstance(garment, list):
            return self.to_json_list(garment)

        return dict(id=garment.id, name=garment.name, url_small=garment.url_small,
                    url_medium=garment.url_medium)
