import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Мария',
    age: 27,
    city: 'Москва',
    photo: 'https://cdn.poehali.dev/projects/0c63f153-33a1-4197-8ab7-c8f868587ddb/files/f9e29cd9-e059-4dd2-9a5a-f757e46f1361.jpg',
    interests: ['Путешествия', 'Йога', 'Фотография', 'Музыка'],
    bio: 'Люблю природу и активный отдых. Ищу человека для совместных приключений. В свободное время занимаюсь йогой и фотографией.'
  });

  const [newInterest, setNewInterest] = useState('');

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter(i => i !== interest)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-peach-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Heart" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">LoveConnect</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MessageCircle" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="overflow-hidden animate-fade-in">
          <div className="relative h-64 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400">
            <img 
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-24 h-24 border-4 border-white">
                    <AvatarImage src={profile.photo} />
                    <AvatarFallback>{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{profile.name}, {profile.age}</h2>
                    <p className="text-white/90 flex items-center gap-1 mt-1">
                      <Icon name="MapPin" size={16} />
                      {profile.city}
                    </p>
                  </div>
                </div>
                {!isEditing && (
                  <Button 
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                    className="mb-2"
                  >
                    <Icon name="Pencil" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {isEditing ? (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Возраст</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="city">Город</Label>
                  <Input
                    id="city"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="mt-2 min-h-32"
                  />
                </div>

                <div>
                  <Label>Интересы</Label>
                  <div className="flex gap-2 mt-2 mb-3">
                    <Input
                      placeholder="Добавить интерес"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                    />
                    <Button onClick={handleAddInterest} type="button">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="pl-3 pr-1 py-1.5">
                        {interest}
                        <button
                          onClick={() => handleRemoveInterest(interest)}
                          className="ml-2 hover:text-destructive transition-colors"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    <Icon name="Check" size={16} className="mr-2" />
                    Сохранить
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">О себе</h3>
                  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Интересы</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-sm py-1.5 px-3">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <Card className="p-4 text-center border-pink-100">
                    <Icon name="Heart" size={24} className="mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold">127</div>
                    <div className="text-sm text-muted-foreground">Понравился</div>
                  </Card>
                  <Card className="p-4 text-center border-pink-100">
                    <Icon name="Users" size={24} className="mx-auto text-accent mb-2" />
                    <div className="text-2xl font-bold">43</div>
                    <div className="text-sm text-muted-foreground">Взаимная симпатия</div>
                  </Card>
                  <Card className="p-4 text-center border-pink-100">
                    <Icon name="MessageCircle" size={24} className="mx-auto text-secondary-foreground mb-2" />
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-sm text-muted-foreground">Сообщений</div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
