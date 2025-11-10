import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface UserProfile {
  id: number;
  name: string;
  age: number;
  city: string;
  photo: string;
  interests: string[];
  bio: string;
  isOnline: boolean;
}

const mockUsers: UserProfile[] = [
  {
    id: 1,
    name: 'Анна',
    age: 28,
    city: 'Москва',
    photo: 'https://cdn.poehali.dev/projects/0c63f153-33a1-4197-8ab7-c8f868587ddb/files/f9e29cd9-e059-4dd2-9a5a-f757e46f1361.jpg',
    interests: ['Путешествия', 'Йога', 'Фотография'],
    bio: 'Люблю природу и активный отдых. Ищу человека для совместных приключений.',
    isOnline: true
  },
  {
    id: 2,
    name: 'Дмитрий',
    age: 32,
    city: 'Санкт-Петербург',
    photo: 'https://cdn.poehali.dev/projects/0c63f153-33a1-4197-8ab7-c8f868587ddb/files/f2b44bf5-7420-443c-9e90-81314d721f7f.jpg',
    interests: ['Кино', 'Музыка', 'Кулинария'],
    bio: 'Увлекаюсь кулинарией и люблю готовить для близких людей.',
    isOnline: false
  },
  {
    id: 3,
    name: 'Елена',
    age: 26,
    city: 'Москва',
    photo: 'https://cdn.poehali.dev/projects/0c63f153-33a1-4197-8ab7-c8f868587ddb/files/f9e29cd9-e059-4dd2-9a5a-f757e46f1361.jpg',
    interests: ['Искусство', 'Танцы', 'Книги'],
    bio: 'Творческая натура, обожаю танцевать и читать классику.',
    isOnline: true
  },
  {
    id: 4,
    name: 'Александр',
    age: 30,
    city: 'Казань',
    photo: 'https://cdn.poehali.dev/projects/0c63f153-33a1-4197-8ab7-c8f868587ddb/files/f2b44bf5-7420-443c-9e90-81314d721f7f.jpg',
    interests: ['Спорт', 'Технологии', 'Путешествия'],
    bio: 'Работаю в IT, люблю активный образ жизни и новые впечатления.',
    isOnline: true
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [ageRange, setAgeRange] = useState([18, 50]);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = user.age >= ageRange[0] && user.age <= ageRange[1];
    const matchesCity = selectedCity === 'all' || user.city === selectedCity;
    return matchesSearch && matchesAge && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-peach-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Heart" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-primary">LoveConnect</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Avatar className="cursor-pointer" onClick={() => navigate('/profile')}>
              <AvatarImage src="https://cdn.poehali.dev/projects/0c63f153-33a1-4197-8ab7-c8f868587ddb/files/f9e29cd9-e059-4dd2-9a5a-f757e46f1361.jpg" />
              <AvatarFallback>Я</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="relative h-64 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 overflow-hidden">
        <img 
          src="https://cdn.poehali.dev/projects/0c63f153-33a1-4197-8ab7-c8f868587ddb/files/9cec7e0d-c5da-4901-b352-ca83fdb8c0c3.jpg"
          alt="hero"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-2 animate-fade-in">Найди свою любовь</h2>
            <p className="text-xl opacity-90 animate-fade-in">Более 10,000 анкет ждут тебя</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl border-pink-100 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Поиск</label>
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Имя или интересы..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Город</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  <SelectItem value="Москва">Москва</SelectItem>
                  <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                  <SelectItem value="Казань">Казань</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Возраст: {ageRange[0]} - {ageRange[1]} лет
              </label>
              <Slider
                value={ageRange}
                onValueChange={setAgeRange}
                min={18}
                max={60}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        <div className="mt-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            Найдено анкет: {filteredUsers.length}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user, index) => (
              <Card 
                key={user.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-pink-100 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProfile(user)}
              >
                <div className="relative h-64">
                  <img 
                    src={user.photo} 
                    alt={user.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {user.isOnline && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Онлайн
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h4 className="text-white font-semibold text-lg">{user.name}, {user.age}</h4>
                    <p className="text-white/90 text-sm flex items-center gap-1">
                      <Icon name="MapPin" size={14} />
                      {user.city}
                    </p>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{user.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.slice(0, 3).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Icon name="Heart" size={16} className="mr-1" />
                      Нравится
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="MessageCircle" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={64} className="mx-auto text-muted-foreground opacity-20 mb-4" />
              <p className="text-xl text-muted-foreground">По вашему запросу ничего не найдено</p>
              <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </div>

      {selectedProfile && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProfile(null)}
        >
          <Card 
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96">
              <img 
                src={selectedProfile.photo} 
                alt={selectedProfile.name}
                className="w-full h-full object-cover"
              />
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => setSelectedProfile(null)}
              >
                <Icon name="X" size={20} />
              </Button>
              {selectedProfile.isOnline && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Онлайн
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold">{selectedProfile.name}, {selectedProfile.age}</h2>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon name="MapPin" size={16} />
                    {selectedProfile.city}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">О себе</h3>
                <p className="text-muted-foreground">{selectedProfile.bio}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Интересы</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <Icon name="Heart" size={20} className="mr-2" />
                  Мне нравится
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;