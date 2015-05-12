__author__ = 'Steve'


class BaseTransformer(object):

    def to_json(self, obj):
        pass

    def to_json_list(self, xlist):
        mylist = []
        for el in xlist:
            mylist.append(self.to_json(el))
        return mylist


class GarmentTransformer(BaseTransformer):
    def to_json(self, garment):
        if isinstance(garment, list):
            return self.to_json_list(garment)

        return dict(id=garment.id, name=garment.name, url_small=garment.url_small,
                    url_medium=garment.url_medium)


class MotifTransformer(BaseTransformer):
    def to_json(self, motif):
        if isinstance(motif, list):
            return self.to_json_list(motif)

        return dict(id=motif.id, name=motif.name, url=motif.url)


class UserTransformer(BaseTransformer):
    def to_json(self, user):
        if isinstance(user, list):
            return self.to_json_list(user)

        return dict(id=user.id, email=user.email, name=user.name)