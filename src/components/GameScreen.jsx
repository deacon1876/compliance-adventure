import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getScenario, calculateFinalScore } from '../data/gameData';

const GameScreen = () => {
  const [currentScenario, setCurrentScenario] = useState('intro');
  const [totalPoints, setTotalPoints] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [questionScores, setQuestionScores] = useState(new Map()); // 각 문제별 최고 점수 추적
  const [currentEpisode, setCurrentEpisode] = useState('');
  const [questionCounter, setQuestionCounter] = useState(new Map()); // 에피소드별 문제 번호 추적
  const [shuffledChoices, setShuffledChoices] = useState([]); // 섞인 선택지 저장

  const scenario = getScenario(currentScenario);

  // 에피소드 이름 매핑
  const getEpisodeName = (scenarioId) => {
    if (scenarioId.includes('chapter1')) return '에피소드 1: 계약 검토 및 협상';
    if (scenarioId.includes('chapter2')) return '에피소드 2: 업체 선정 과정';
    if (scenarioId.includes('chapter3')) return '에피소드 3: 정보 보안 관리';
    if (scenarioId.includes('chapter4')) return '에피소드 4: 선물 및 접대 정책';
    if (scenarioId.includes('episode1')) return '에피소드 5: 직장 내 괴롭힘 대응';
    if (scenarioId.includes('episode2')) return '에피소드 6: 담합 및 부정청탁 방지';
    if (scenarioId.includes('episode3')) return '에피소드 7: 사이버 보안 및 피싱 대응';
    return '';
  };

  // 문제 번호 추적
  const getQuestionNumber = (scenarioId) => {
    const episodeName = getEpisodeName(scenarioId);
    if (!episodeName) return 0;
    
    const currentCount = questionCounter.get(episodeName) || 0;
    const newCount = currentCount + 1;
    setQuestionCounter(prev => new Map(prev.set(episodeName, newCount)));
    return newCount;
  };

  // 선택지 섞기 함수
  const shuffleChoices = (choices) => {
    if (!choices) return [];
    
    // 일반 게임 선택지인 경우에만 섞기 (인트로나 엔딩 제외)
    const isGameQuestion = choices.length <= 3 && 
                          !currentScenario.includes('intro') && 
                          !currentScenario.includes('end') &&
                          choices.some(choice => choice.points !== 0);
    
    if (!isGameQuestion) {
      return choices;
    }

    // 색깔 배열
    const colors = ['green', 'blue', 'yellow', 'purple', 'orange', 'pink'];
    
    // 선택지를 복사하고 섞기
    const shuffled = [...choices];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // 섞인 선택지에 무작위 색깔 할당
    return shuffled.map((choice, index) => ({
      ...choice,
      color: colors[index % colors.length]
    }));
  };

  // 시나리오가 변경될 때마다 선택지 섞기
  useEffect(() => {
    if (scenario && scenario.choices) {
      setShuffledChoices(shuffleChoices(scenario.choices));
    }
  }, [currentScenario, scenario]);

  // 새로운 등급 계산 함수 - 퍼센트만 표시
  const calculateNewGrade = (percentage) => {
    if (percentage >= 90) return { message: '인테그리티의 컴플라이언스 전문가' };
    if (percentage >= 80) return { message: '발전 중인 컴플라이언서' };
    if (percentage >= 70) return { message: '막 컴플라이언스 공부를 시작한 유망주' };
    return { message: '즉시 컴플라이언스 공부가 필요해요!' };
  };

  const handleChoice = (choice) => {
    // 실제 질문인지 확인 (점수가 있고, 인트로나 엔딩이 아닌 경우)
    const isActualQuestion = choice.points !== 0 && 
                            !currentScenario.includes('intro') && 
                            !currentScenario.includes('end') &&
                            !currentScenario.includes('_choice_') &&
                            scenario.choices && scenario.choices.length > 1;

    let pointsToAdd = choice.points;
    let isRetry = false;
    let previousScore = 0;
    let isImprovement = false;
    let episodeName = '';
    let questionNumber = 0;
    
    if (isActualQuestion) {
      episodeName = getEpisodeName(currentScenario);
      questionNumber = getQuestionNumber(currentScenario);
      
      // 이전에 이 문제를 푼 적이 있는지 확인
      if (questionScores.has(currentScenario)) {
        isRetry = true;
        previousScore = questionScores.get(currentScenario);
        
        // 더 높은 점수인 경우에만 점수 업데이트
        if (choice.points > previousScore) {
          isImprovement = true;
          pointsToAdd = choice.points - previousScore; // 차이만큼만 추가
          setQuestionScores(prev => new Map(prev.set(currentScenario, choice.points)));
        } else {
          pointsToAdd = 0; // 점수 개선이 없으면 추가하지 않음
        }
      } else {
        // 처음 푸는 문제
        setQuestionScores(prev => new Map(prev.set(currentScenario, choice.points)));
      }
    }

    const newPoints = totalPoints + pointsToAdd;
    setTotalPoints(newPoints);
    
    const historyEntry = {
      scenario: currentScenario,
      choice: choice.text,
      points: pointsToAdd,
      originalPoints: choice.points,
      isRetry: isRetry,
      previousScore: previousScore,
      isImprovement: isImprovement,
      episodeName: episodeName,
      questionNumber: questionNumber
    };
    setGameHistory([...gameHistory, historyEntry]);

    if (isActualQuestion) {
      // 즉시 평가 및 점수 피드백 생성
      let evaluation = "";
      let evaluationColor = "";
      
      if (choice.points >= 3) {
        evaluation = "🎉 훌륭한 선택입니다!";
        evaluationColor = "text-green-600 bg-green-50 border-green-200";
      } else if (choice.points >= 1) {
        evaluation = "👍 좋은 선택입니다!";
        evaluationColor = "text-blue-600 bg-blue-50 border-blue-200";
      } else if (choice.points === 0) {
        evaluation = "⚠️ 보통 선택입니다.";
        evaluationColor = "text-yellow-600 bg-yellow-50 border-yellow-200";
      } else {
        evaluation = "❌ 아쉬운 선택입니다.";
        evaluationColor = "text-red-600 bg-red-50 border-red-200";
      }

      const feedbackWithEvaluation = {
        evaluation: evaluation,
        evaluationColor: evaluationColor,
        questionScore: choice.points,
        pointsAdded: pointsToAdd,
        isRetry: isRetry,
        previousScore: previousScore,
        isImprovement: isImprovement,
        originalFeedback: scenario.feedback,
        showScoreFeedback: true
      };

      setCurrentFeedback(feedbackWithEvaluation);
      setShowFeedback(true);
    } else {
      // 제목 슬라이드나 중간 챕터는 점수 피드백 없이 바로 진행
      if (scenario.feedback) {
        setCurrentFeedback({
          originalFeedback: scenario.feedback,
          showScoreFeedback: false
        });
        setShowFeedback(true);
      } else {
        setCurrentScenario(choice.nextScenario);
      }
    }
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
    setCurrentFeedback(null);
    // 피드백 후 다음 시나리오로 이동
    const lastChoice = gameHistory[gameHistory.length - 1];
    const lastScenario = getScenario(gameHistory[gameHistory.length - 1]?.scenario);
    if (lastScenario && lastScenario.choices) {
      const selectedChoice = lastScenario.choices.find(c => c.text === lastChoice.choice);
      if (selectedChoice) {
        setCurrentScenario(selectedChoice.nextScenario);
      }
    }
  };

  const resetGame = () => {
    setCurrentScenario('intro');
    setTotalPoints(0);
    setGameHistory([]);
    setShowFeedback(false);
    setCurrentFeedback(null);
    setQuestionScores(new Map());
    setQuestionCounter(new Map());
    setShuffledChoices([]);
  };

  // 색깔 매핑 함수
  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400',
      green: 'border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400',
      purple: 'border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400',
      orange: 'border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400',
      pink: 'border-pink-300 bg-pink-50 hover:bg-pink-100 hover:border-pink-400',
      teal: 'border-teal-300 bg-teal-50 hover:bg-teal-100 hover:border-teal-400',
      gray: 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400',
      yellow: 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-400'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getButtonColor = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500',
      teal: 'bg-teal-500',
      gray: 'bg-gray-500',
      yellow: 'bg-yellow-500'
    };
    return colorMap[color] || colorMap.blue;
  };

  const renderResults = () => {
    // 실제로 푼 문제 수 계산
    const actualQuestionsSolved = questionScores.size;
    
    // 최대 가능 점수 계산 (각 문제당 최대 3점)
    const maxPossibleScore = actualQuestionsSolved * 3;
    
    // 퍼센트 계산
    const percentage = maxPossibleScore > 0 ? Math.round((totalPoints / maxPossibleScore) * 100) : 0;
    
    // 새로운 등급 시스템 적용
    const gradeResult = calculateNewGrade(percentage);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur-md shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">최종 점수</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2 text-blue-600">
                {percentage}%
              </div>
              <div className="text-2xl font-semibold mb-4 text-gray-700">
                {gradeResult.message}
              </div>
              
              {/* 상세 점수 정보 */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-blue-800 font-medium mb-2">
                  📊 상세 점수 분석
                </div>
                <div className="text-sm text-blue-600 space-y-1">
                  <div>실제 해결한 문제: {actualQuestionsSolved}개</div>
                  <div>취득 가능한 최대 점수: {maxPossibleScore}점</div>
                  <div>실제 취득한 총점: {totalPoints}점</div>
                  <div className="font-semibold">달성률: {percentage}%</div>
                </div>
                <div className="text-xs text-blue-500 mt-2">
                  ※ 재도전한 문제의 경우 더 높은 점수만 반영됩니다.
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">게임 히스토리</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {gameHistory.filter(entry => entry.originalPoints !== 0).map((entry, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                      <div className="text-gray-600 font-medium">
                        {entry.episodeName} - 문제 {entry.questionNumber}
                      </div>
                      <div className="text-gray-500 text-xs truncate">
                        {entry.choice}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {entry.isRetry && (
                        <span className="text-xs text-orange-600">
                          {entry.isImprovement ? `(${entry.previousScore}→${entry.originalPoints})` : '(재도전)'}
                        </span>
                      )}
                      <Badge variant={entry.originalPoints > 0 ? "default" : "destructive"}>
                        {entry.originalPoints > 0 ? '+' : ''}{entry.originalPoints}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
              다시 플레이하기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderFeedback = () => {
    if (!showFeedback || !currentFeedback) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <Card className="w-full max-w-lg mx-4 bg-white/95 backdrop-blur-md shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-center">
              {/* 실제 질문인 경우에만 즉시 평가 및 점수 표시 */}
              {currentFeedback.showScoreFeedback && (
                <>
                  {/* 즉시 평가 표시 */}
                  <div className={`inline-block px-4 py-2 rounded-lg border-2 mb-4 ${currentFeedback.evaluationColor}`}>
                    <span className="text-xl font-bold">{currentFeedback.evaluation}</span>
                  </div>
                  
                  {/* 점수 표시 */}
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      이번 질문 점수: 
                      <span className={`ml-2 ${
                        currentFeedback.questionScore >= 3 ? 'text-green-600' :
                        currentFeedback.questionScore >= 1 ? 'text-blue-600' :
                        currentFeedback.questionScore === 0 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {currentFeedback.questionScore > 0 ? '+' : ''}{currentFeedback.questionScore}점
                      </span>
                    </div>
                    
                    {/* 재도전 관련 정보 */}
                    {currentFeedback.isRetry && (
                      <div className="text-sm mb-2">
                        {currentFeedback.isImprovement ? (
                          <div className="text-green-600 bg-green-50 p-2 rounded border">
                            🎉 점수 개선! {currentFeedback.previousScore}점 → {currentFeedback.questionScore}점<br/>
                            <span className="text-xs">더 높은 점수만 총점에 반영됩니다. (+{currentFeedback.pointsAdded}점 추가)</span>
                          </div>
                        ) : (
                          <div className="text-orange-600 bg-orange-50 p-2 rounded border">
                            ⚠️ 재도전 문제입니다. 이전 점수: {currentFeedback.previousScore}점<br/>
                            <span className="text-xs">더 높은 점수를 받아야 총점이 증가합니다.</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* 재도전 안내 메시지 */}
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border mb-2">
                      ※ 재도전한 문제의 경우 더 높은 점수만 반영됩니다.
                    </div>
                    
                    <div className="text-lg text-gray-600">
                      총 점수: {totalPoints}점
                    </div>
                  </div>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 기존 피드백 내용이 있으면 표시 */}
            {currentFeedback.originalFeedback && (
              <>
                <div className={`text-lg font-semibold ${
                  currentFeedback.originalFeedback.title.includes('훌륭') || currentFeedback.originalFeedback.title.includes('완벽') ? 'text-green-600' :
                  currentFeedback.originalFeedback.title.includes('위험') ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {currentFeedback.originalFeedback.title}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {currentFeedback.originalFeedback.content}
                </p>
              </>
            )}
            
            <Button onClick={handleFeedbackClose} className="w-full bg-green-600 hover:bg-green-700 text-white">
              다음으로 계속
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  // final_score 시나리오인 경우 결과 화면 표시
  if (currentScenario === 'final_score') {
    return renderResults();
  }

  // 현재 사용할 선택지 결정
  const choicesToRender = shuffledChoices.length > 0 ? shuffledChoices : (scenario.choices || []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full Screen Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${scenario.background})`,
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Header with Score */}
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            컴플라이언스 시뮬레이터
          </h1>
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <span className="text-lg font-semibold text-gray-800">점수: {totalPoints}</span>
          </div>
        </div>
      </div>

      {/* Main Content - Floating Window */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl md:text-2xl font-bold text-blue-600 mb-2">
              {scenario.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Background Image Display - 4x Larger */}
            <div className="w-full h-96 md:h-[32rem] lg:h-[40rem] rounded-xl overflow-hidden shadow-lg">
              <img 
                src={scenario.background} 
                alt="Scene background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Character and Text */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {scenario.character && (
                <div className="flex-shrink-0 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg mx-auto mb-2">
                    <img 
                      src={scenario.character.image} 
                      alt={scenario.character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {scenario.character.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {scenario.character.role}
                  </div>
                </div>
              )}
              
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner">
                  <p className="text-gray-800 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {scenario.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Choices */}
            {choicesToRender && choicesToRender.length > 0 && (
              <div className="space-y-3">
                {scenario.id === 'intro' ? (
                  // 에피소드 선택 메뉴 - 그리드 레이아웃
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {choicesToRender.map((choice, index) => (
                      <Button
                        key={index}
                        onClick={() => handleChoice(choice)}
                        variant="outline"
                        className={`w-full p-6 h-auto text-left justify-start text-wrap border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                          index % 3 === 0 ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400' :
                          index % 3 === 1 ? 'border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400' :
                          'border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                            index % 3 === 0 ? 'bg-blue-500' :
                            index % 3 === 1 ? 'bg-green-500' :
                            'bg-purple-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">
                            {choice.text}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                ) : scenario.id.includes('_end') ? (
                  // 에피소드 끝 선택지 - 색깔 적용
                  <div className="grid gap-3">
                    {choicesToRender.map((choice, index) => (
                      <Button
                        key={index}
                        onClick={() => handleChoice(choice)}
                        variant="outline"
                        className={`w-full p-4 h-auto text-left justify-start text-wrap border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${getColorClasses(choice.color)}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getButtonColor(choice.color)}`}>
                            {index + 1}
                          </div>
                          <span className="text-sm md:text-base text-gray-800 leading-relaxed">
                            {choice.text}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                ) : (
                  // 일반 게임 선택지 - 섞인 순서와 색깔 적용
                  <>
                    <p className="text-center text-gray-600 font-medium">
                      각 선택은 당신의 컴플라이언스 점수에 영향을 미칩니다.<br />
                      신중하게 선택하여 최고의 결과를 얻어보세요!
                    </p>
                    
                    <div className="grid gap-3">
                      {choicesToRender.map((choice, index) => (
                        <Button
                          key={index}
                          onClick={() => handleChoice(choice)}
                          variant="outline"
                          className={`w-full p-4 h-auto text-left justify-start text-wrap border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${getColorClasses(choice.color)}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getButtonColor(choice.color)}`}>
                              {String.fromCharCode(65 + index)}.
                            </div>
                            <span className="text-sm md:text-base text-gray-800 leading-relaxed">
                              {choice.text}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Render Feedback Modal */}
      {renderFeedback()}
    </div>
  );
};

export default GameScreen;

