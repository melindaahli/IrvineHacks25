class Player:
    def __init__(self, username, role="Explorer", xp=0, level=1, reputation=0):
        self.username = username
        self.role = role  # Default to "Explorer" (can change based on progression)
        self.xp = xp
        self.level = level
        # self.reputation = reputation
        self.achievements = []
        self.quests_completed = []
        # self.stamps = []
        self.guild = None
        self.favorites = []
        self.inventory = []
        self.avatar = None

    def earn_xp(self, points):
        """Increase XP and level up if necessary."""
        self.xp += points
        if self.xp >= self.level * 100:  # Simple leveling system
            self.level += 1
            return (f"{self.username} leveled up to {self.level}!")

    def complete_quest(self, quest_name, reward=10):
        """Mark a quest as completed and earn XP."""
        if quest_name not in self.quests_completed:
            self.quests_completed.append(quest_name)
            self.earn_xp(reward)
            return (f"{self.username} completed '{quest_name}' and earned {reward} XP!")

    def collect_stamp(self, business_name):
        """Collect a business visit stamp."""
        if business_name not in self.stamps:
            self.stamps.append(business_name)
            return (f"{self.username} collected a stamp from {business_name}!")

    def __repr__(self):
        return f"Player(username={self.username}, level={self.level}, role={self.role})"
